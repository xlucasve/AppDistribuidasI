package com.MoviePlay.backendapi.dtos.responses;

import com.MoviePlay.backendapi.models.MovieScroll;

import java.util.List;

public record ResponseHomeData(
        MovieScroll bigMovies,
        List<MovieScroll> sidescrolls)
{}


