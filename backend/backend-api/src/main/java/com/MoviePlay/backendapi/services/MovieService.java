package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.requests.RequestAddRating;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.MovieRating;
import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.entities.enums.OrderSearchBy;
import com.MoviePlay.backendapi.entities.enums.SortSearchBy;
import com.MoviePlay.backendapi.models.MovieScroll;
import com.MoviePlay.backendapi.repositories.MovieRatingRepository;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.utils.DTOMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final ActorService actorService;
    private final UserRepository userRepository;
    private final MovieRatingRepository movieRatingRepository;
    private final DTOMapper dtoMapper;



    public MovieService(MovieRepository movieRepository, ActorService actorService, UserRepository userRepository, MovieRatingRepository movieRatingRepository, DTOMapper dtoMapper) {
        this.movieRepository = movieRepository;
        this.actorService = actorService;
        this.userRepository = userRepository;
        this.movieRatingRepository = movieRatingRepository;
        this.dtoMapper = dtoMapper;
    }



    public ResponseEntity<ResponseHomeData> getHomeData() {
        Pageable pageable = PageRequest.of(0, 3);
        Page<Movie> latestMoviesPage = movieRepository.findAllByOrderByReleaseDateDesc(pageable);
        List<ResponseMovieInScroll> latestMovies = dtoMapper.listMovieToListMovieInScroll(latestMoviesPage.getContent());

        MovieScroll bigMovies = new MovieScroll();
        bigMovies.setMoviesData(latestMovies);
        bigMovies.setCount(latestMovies.size());
        bigMovies.setGenreName("Big Movie Carousel");

        List<MovieScroll> genreScrolls = new ArrayList<>();

        Set<String> genresUsed = new HashSet<>();


        for (int i = 0; i < 3; i++){
            String sidescrollGenreName = "Mejores Películas";
            Pageable last10Movies = PageRequest.of(i, 10);
            List<Movie> foundMovies = movieRepository.findAllByOrderByReleaseDateDesc(last10Movies).getContent();
            for (Movie movie: foundMovies){
                if (!genresUsed.contains(movie.getGenres().get(0).getName())){
                    sidescrollGenreName = movie.getGenres().get(0).getName();
                    genresUsed.add(movie.getGenres().get(0).getName());
                    break;
                }
            }
            List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(foundMovies);
            //Quick hack to try to get a different genre name
            MovieScroll movieScroll = new MovieScroll(movies, movies.size(), sidescrollGenreName);
            genreScrolls.add(movieScroll);
        }

        //Quick patch to ease work on frontend
        ResponseHomeData responseHomeData = new ResponseHomeData(bigMovies, genreScrolls.get(0),genreScrolls.get(1),genreScrolls.get(1));


        return new ResponseEntity<>(responseHomeData, HttpStatus.OK);
    }


    public ResponseEntity<ResponseInfiniteScroll> getJustReleased(Pageable pageable) {
        List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(movieRepository.findAllByOrderByReleaseDateDesc(pageable).getContent());
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(movies);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseInfiniteScroll> getMoviesBySearchParam(String input, Pageable pageable, OrderSearchBy orderBy, SortSearchBy sortBy) {

        Set<Movie> moviesFoundFromActors = actorService.getMoviesFromActorBySearchParam(input, pageable);
        List<Movie> moviesFoundByTitle = movieRepository.findAllByTitleContainsIgnoreCase(input, pageable).getContent();

        Set<Movie> moviesSet = new HashSet<>();
        moviesSet.addAll(moviesFoundFromActors);
        moviesSet.addAll(moviesFoundByTitle);

        List<Movie> moviesList = new ArrayList<>(moviesSet);


        switch (sortBy){
            case ASC -> {
                switch (orderBy) {
                    case RATING -> moviesList.sort((Comparator.comparing(Movie::getRating)));
                    case DATE -> moviesList.sort((Comparator.comparing(Movie::getReleaseDate)));
                    default -> {
                    }
                }
            }
            case DESC -> {
                switch (orderBy) {
                    case RATING -> moviesList.sort((Comparator.comparing(Movie::getRating)).reversed());
                    case DATE -> moviesList.sort((Comparator.comparing(Movie::getReleaseDate)).reversed());
                    default -> {
                    }
                }
            }
        }

        ResponseInfiniteScroll response = new ResponseInfiniteScroll(dtoMapper.listMovieToListMovieInScroll(moviesList));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseMovieInScroll> getMovieById(Long movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            throw new EntityNotFoundException("Movie id with id: " + movieId + " does not exist");
        }
        ResponseMovieInScroll response = dtoMapper.movieToResponseInScroll(movie.get());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<Movie> addRating(Long movieId, Long userId, RequestAddRating rating) {
        Optional<Movie> foundMovie = movieRepository.findById(movieId);
        if (foundMovie.isEmpty()) {
            throw new EntityNotFoundException("Movie id with id: " + movieId + " does not exist");
        }

        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        Movie movie = foundMovie.get();
        User user = foundUser.get();

        Optional<MovieRating> foundRating = movieRatingRepository.findExistingRating(user, movie);
        if (foundRating.isEmpty()){
            Double movieRating = movie.getRating();
            Integer movieRateCount = movie.getVoteCount();

            Double oldAverage = movieRating*movieRateCount;
            movieRateCount++;

            movie.setVoteCount(movieRateCount);
            movie.setRating((oldAverage+rating.rating())/movieRateCount);
            Movie storedMovie = movieRepository.save(movie);

            MovieRating movieRatingObj = new MovieRating();
            movieRatingObj.setRatedMovie(storedMovie);
            movieRatingObj.setUser(user);
            movieRatingObj.setRating(rating.rating());
            MovieRating storedRating = movieRatingRepository.save(movieRatingObj);

            System.out.println(storedRating.getUser().getEmail());
            System.out.println(storedRating.getRatedMovie().getTitle());

            user.getRatedMovies().add(storedRating);
            userRepository.save(user);
        } else{

            System.out.println("Movie Rating already found");
            MovieRating movieRatingObj = foundRating.get();
            Double movieRating = movie.getRating();
            Integer movieRateCount = movie.getVoteCount();

            Double oldAverage = movieRating*movieRateCount-movieRatingObj.getRating();
            movie.setRating((oldAverage+rating.rating())/movieRateCount);
            movieRepository.save(movie);
            movieRatingObj.setRating(rating.rating());
            movieRatingRepository.save(movieRatingObj);
        }


        return new ResponseEntity<>(movie, HttpStatus.OK);
    }
}
