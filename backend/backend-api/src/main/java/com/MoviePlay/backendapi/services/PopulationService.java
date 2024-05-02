package com.MoviePlay.backendapi.services;


import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PopulationService {

    private final MovieRepository movieRepository;

    public String populateDB(List<Movie> data){
        for (Movie movie: data){
            System.out.println(movie.getRating());
            System.out.println(movie.getPosterImageLink());
            movieRepository.save(movie);
        }
        return "Worked";
    }
}
