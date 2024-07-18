package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.services.PopulationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/population")
public class PopulationController {

    private final PopulationService populationService;

    public PopulationController(PopulationService populationService) {
        this.populationService = populationService;
    }

    @PostMapping("/")
    public String populateDB(@RequestBody List<Movie> data) {
        return populationService.populateDB(data);
    }
}
