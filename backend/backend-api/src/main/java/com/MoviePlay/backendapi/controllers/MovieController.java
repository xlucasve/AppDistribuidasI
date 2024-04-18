package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestCreateMovie;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/movie")
public class MovieController {

    @GetMapping("/")
    public ResponseEntity<ResponseHomeData> getHomeData(){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMovieInScroll> getMovieById(@PathVariable Long movieId){
        return null;
    }

    @GetMapping("/")
    public ResponseEntity<Movie> getMoviesBySearchParam(@RequestParam String search){
        return null;
    }

    @PostMapping("/")
    public ResponseEntity<Movie> createMovie(@RequestBody RequestCreateMovie movieData){
        return null;
    }

    @PutMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> addActorToMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }

    @DeleteMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> removeActorFromMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long movieId){
        return null;
    }
}
