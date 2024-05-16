package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.enums.OrderSearchBy;
import com.MoviePlay.backendapi.models.MovieScroll;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import com.MoviePlay.backendapi.utils.DTOMapper;
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
    private final DTOMapper dtoMapper;



    public MovieService(MovieRepository movieRepository, ActorService actorService, DTOMapper dtoMapper) {
        this.movieRepository = movieRepository;
        this.actorService = actorService;
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

        for (int i = 0; i < 3; i++){
            Pageable last10Movies = PageRequest.of(i, 10);
            List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(movieRepository.findAllByOrderByReleaseDateDesc(last10Movies).getContent());
            MovieScroll movieScroll = new MovieScroll(movies, movies.size(), "GenreName");
            genreScrolls.add(movieScroll);
        }

        ResponseHomeData responseHomeData = new ResponseHomeData(bigMovies, genreScrolls);


        return new ResponseEntity<>(responseHomeData, HttpStatus.OK);
    }


    public ResponseEntity<ResponseInfiniteScroll> getJustReleased(Pageable pageable) {
        List<ResponseMovieInScroll> movies = dtoMapper.listMovieToListMovieInScroll(movieRepository.findAllByOrderByReleaseDateDesc(pageable).getContent());
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(movies);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseInfiniteScroll> getMoviesBySearchParam(String input, Pageable pageable, OrderSearchBy orderBy) {

        Set<Movie> moviesFoundFromActors = actorService.getMoviesFromActorBySearchParam(input, pageable);
        List<Movie> moviesFoundByTitle = movieRepository.findAllByTitle(input, pageable).getContent();

        Set<Movie> moviesSet = new HashSet<>();
        moviesSet.addAll(moviesFoundFromActors);
        moviesSet.addAll(moviesFoundByTitle);

        List<Movie> moviesList = new ArrayList<>(moviesSet);

        switch (orderBy){
            case RATING -> moviesList.sort((Comparator.comparing(Movie::getRating)));
            case DATE -> moviesList.sort((Comparator.comparing(Movie::getReleaseDate)));
            default -> {
            }
        }
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(dtoMapper.listMovieToListMovieInScroll(moviesList));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
