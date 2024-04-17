package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1/movie")
public class MovieController {

    @GetMapping("/")
    public ResponseEntity<ResponseHomeData> getHomeData(){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMovie> getMovieById(@PathVariable Long movieId){
        return null;
    }

}
