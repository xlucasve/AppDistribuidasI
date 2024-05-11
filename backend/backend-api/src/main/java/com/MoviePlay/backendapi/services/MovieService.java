package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.models.MovieScroll;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    public ResponseEntity<List<Movie>> getHomeData() {
        Pageable pageable = PageRequest.of(0, 3);
        Page<Movie> latestMoviesPage = movieRepository.findAllByOrderByReleaseDateDesc(pageable);
        List<Movie> latestMovies = latestMoviesPage.getContent();

        MovieScroll bigMovies = new MovieScroll();

        return new ResponseEntity<>(movieRepository.findAll(), HttpStatus.OK);
    }
}
