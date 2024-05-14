package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.models.MovieScroll;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import com.MoviePlay.backendapi.utils.DTOMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final DTOMapper dtoMapper;



    public MovieService(MovieRepository movieRepository, DTOMapper dtoMapper) {
        this.movieRepository = movieRepository;
        this.dtoMapper = dtoMapper;
    }



    public ResponseEntity<?> getHomeData() {
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
}
