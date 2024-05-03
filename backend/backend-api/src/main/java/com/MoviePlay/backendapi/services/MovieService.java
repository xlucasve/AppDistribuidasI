package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.repositories.MovieRepository;
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
        return new ResponseEntity<>(movieRepository.findAll(), HttpStatus.OK);
    }
}
