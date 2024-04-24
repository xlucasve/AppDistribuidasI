package com.MoviePlay.backendapi.dtos.responses;

import com.MoviePlay.backendapi.entities.enums.Genre;

import java.util.List;

public record ResponseMovieInScroll(
        Long movieId,
        String title,
        String posterImageLink,
        Double rating,
        List<Genre> genres
) {
}
