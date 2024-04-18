package com.MoviePlay.backendapi.dtos.responses;

public record ResponseMovieInScroll(
        Long movieId,
        String title,
        String posterImageLink,
        Double rating
) {
}
