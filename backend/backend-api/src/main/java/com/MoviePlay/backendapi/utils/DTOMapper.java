package com.MoviePlay.backendapi.utils;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DTOMapper{

    List<ResponseMovieInScroll> listMovieToListMovieInScroll(List<Movie> movieList);
}
