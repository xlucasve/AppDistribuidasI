package com.MoviePlay.backendapi.dtos.responses;


import com.MoviePlay.backendapi.entities.Genre;

import java.time.LocalDate;
import java.util.List;

public record ResponseMovieInScroll(
        Long movieId,
        String title,
        String posterImageLink,
        Double rating,
        List<Genre> genres,
        Boolean isFavorite,
        LocalDate releaseDate
) {
}
