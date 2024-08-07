package com.MoviePlay.backendapi.utils;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMoviePage;
import com.MoviePlay.backendapi.dtos.responses.UserResponse;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DTOMapper{

    List<ResponseMovieInScroll> listMovieToListMovieInScroll(List<Movie> movieList);
    ResponseMovieInScroll movieToResponseInScroll(Movie movie);

    ResponseMoviePage movieToResponseMoviePage(Movie movie, @Context Boolean isFavorite, @Context Double userRating);
    UserResponse userToUserResponse(User user);
}
