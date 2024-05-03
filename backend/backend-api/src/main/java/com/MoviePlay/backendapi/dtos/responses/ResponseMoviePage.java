package com.MoviePlay.backendapi.dtos.responses;

import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.entities.Genre;
import com.MoviePlay.backendapi.entities.Image;

import java.time.LocalDate;
import java.util.List;

public record ResponseMoviePage(
        Long movieId,
        String title,
        String subtitle,
        String synopsis,
        List<Genre> genres,
        String trailerLink,
        String posterImageLink,
        Double rating,
        List<Image> galleryImagesLink,
        Integer hourLength,
        Integer minuteLength,
        LocalDate releaseDate,
        List<Actor> cast
) {
}
