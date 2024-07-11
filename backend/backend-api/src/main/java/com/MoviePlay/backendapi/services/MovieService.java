package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.requests.RequestAddRating;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMoviePage;
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

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

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

        int localHour = LocalTime.now().getHour();

        Pageable bigMoviesPageable = PageRequest.of(localHour, 3);
        Page<Movie> mostRatedMoviesPage = movieRepository.findAllByOrderByRatingDesc(bigMoviesPageable);
        List<ResponseMovieInScroll> randomMoviesForBigScroll = dtoMapper.listMovieToListMovieInScroll(mostRatedMoviesPage.getContent());

        MovieScroll bigMovies = new MovieScroll();
        bigMovies.setMoviesData(randomMoviesForBigScroll);
        bigMovies.setCount(3);
        bigMovies.setGenreName("Big Movie Carousel");


        List<MovieScroll> genreScrolls = new ArrayList<>();
        Set<Long> excludedIds = new HashSet<>();
        List<String> genresForSidescrolls = new ArrayList<>(List.of("Crime", "Drama", "Action"));

        int AMOUNT_MOVIES_SIDESSCROLLS = 15;
        Pageable pageable = PageRequest.of(localHour / 6, AMOUNT_MOVIES_SIDESSCROLLS);

        for (String genre: genresForSidescrolls){
            Page<Movie> moviesByGenre = movieRepository.findAllByGenreExcludingIds(genre, excludedIds, pageable);
            moviesByGenre.forEach(movie -> excludedIds.add(movie.getMovieId()));
            List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(moviesByGenre.getContent());
            MovieScroll movieScroll = new MovieScroll(movies, movies.size(), genre);
            genreScrolls.add(movieScroll);
        }


        //Quick patch to ease work on frontend
        ResponseHomeData responseHomeData = new ResponseHomeData(bigMovies, genreScrolls.get(0),genreScrolls.get(1),genreScrolls.get(2));

        return new ResponseEntity<>(responseHomeData, HttpStatus.OK);
    }


    public ResponseEntity<ResponseInfiniteScroll> getJustReleased(Integer page, Integer size) {

        if (page > 0){
            page--;
        }
        if (page < 0){
            page = 0;
        }

        Pageable pageable = PageRequest.of(page, size);

        List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(movieRepository.findAllByOrderByReleaseDateDesc(pageable).getContent());
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(movies);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseInfiniteScroll> getMoviesBySearchParam(String input, Pageable pageable, OrderSearchBy orderBy, SortSearchBy sortBy, Long userId) {

        Optional<User> foundUser = userRepository.findById(userId);
        List<Movie> userFavoriteMovies = new ArrayList<>();
        if (foundUser.isPresent()){
            userFavoriteMovies = foundUser.get().getFavoriteMovies();
        }

        Set<Movie> moviesFromActors = actorService.getMoviesFromActorBySearchParam(input);
        Set<Movie> moviesFromTitles = getMoviesByTitlePaginated(input, pageable);

        Set<Movie> moviesSet = new HashSet<>();
        moviesSet.addAll(moviesFromActors);
        moviesSet.addAll(moviesFromTitles);

        List<Movie> moviesList = new ArrayList<>(moviesSet);
        sortMovies(moviesList, orderBy, sortBy);

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), moviesList.size());

        if (start >= moviesList.size()) {
            return new ResponseEntity<>(new ResponseInfiniteScroll(Collections.emptyList()), HttpStatus.OK);
        }

        List<Movie> paginatedMoviesList = moviesList.subList(start, end);
        List<ResponseMovieInScroll> responseList = new ArrayList<>();
        for (Movie movie: paginatedMoviesList){
            responseList.add(mapMovieToResponseInScroll(movie, userFavoriteMovies.contains(movie)));
        }
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(responseList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private Set<Movie> getMoviesByTitlePaginated(String input, Pageable pageable) {
        Page<Movie> moviesPage = movieRepository.findAllByTitleContainsIgnoreCase(input, pageable);
        return new HashSet<>(moviesPage.getContent());
    }

    private void sortMovies(List<Movie> moviesList, OrderSearchBy orderBy, SortSearchBy sortBy) {
        Comparator<Movie> comparator = switch (orderBy) {
            case RATING -> Comparator.comparing(Movie::getRating);
            case DATE -> Comparator.comparing(Movie::getReleaseDate);
            default -> throw new IllegalStateException("Unexpected value: " + orderBy);
        };
        if (sortBy == SortSearchBy.DESC) {
            comparator = comparator.reversed();
        }
        moviesList.sort(comparator);
    }


    public ResponseEntity<ResponseMoviePage> getMovieById(Long movieId, Long userId) {
        Optional<User> foundUser = userRepository.findById(userId);

        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        List<Movie> userFavoriteMovies = new ArrayList<>();
        if (foundUser.isPresent()){
            userFavoriteMovies = foundUser.get().getFavoriteMovies();
        }
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            throw new EntityNotFoundException("Movie id with id: " + movieId + " does not exist");
        }

        Optional<MovieRating> foundRating = movieRatingRepository.findExistingRating(foundUser.get(), movie.get());

        ResponseMoviePage response = mapMovieToDTO(
                movie.get(),
                userFavoriteMovies.contains(movie.get()),
                foundRating.map(movieRating -> movieRating.getRating().doubleValue()).orElse(0.0));

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

            user.getRatedMovies().add(storedRating);
            userRepository.save(user);
        } else{

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

    private ResponseMoviePage mapMovieToDTO(Movie movie, Boolean isFavorite, Double userRating){
        return new ResponseMoviePage(movie.getMovieId(),
                movie.getTitle(),
                movie.getSynopsis(),
                movie.getGenres(),
                movie.getTrailerLink(),
                movie.getPosterImageLink(),
                movie.getRating(),
                movie.getGalleryImagesLink(),
                movie.getHourLength(),
                movie.getMinuteLength(),
                movie.getReleaseDate(),
                movie.getActors(),
                movie.getDirectors(),
                movie.getVoteCount(),
                isFavorite,
                userRating);
    }

    private ResponseMovieInScroll mapMovieToResponseInScroll(Movie movie, Boolean isFavorite){
        return new ResponseMovieInScroll(movie.getMovieId(),
                movie.getTitle(),
                movie.getPosterImageLink(),
                movie.getRating(),
                movie.getGenres(),
                isFavorite);
    }
}
