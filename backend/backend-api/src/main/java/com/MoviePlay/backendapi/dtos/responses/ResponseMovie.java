package com.MoviePlay.backendapi.dtos.responses;

public record ResponseMovie(
        Long movieId,
        String title,
        String posterImageLink,
        Double rating,
        Integer ratingCount
) {
}
