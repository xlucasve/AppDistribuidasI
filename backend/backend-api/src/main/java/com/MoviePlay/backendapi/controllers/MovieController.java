package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestAddRating;
import com.MoviePlay.backendapi.dtos.requests.RequestCreateMovie;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMoviePage;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.enums.OrderSearchBy;
import com.MoviePlay.backendapi.entities.enums.SortSearchBy;
import com.MoviePlay.backendapi.exceptions.ApiException;
import com.MoviePlay.backendapi.services.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    @Operation(summary = "Get movies for homepage", description = "Retrieve a list of movies that are to be shown is the homepage. " +
            "The response object contains a list for movies that are to be shown in the big mode, and a list of movies to be shown in sidescrolls.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/")
    public ResponseEntity<ResponseHomeData> getHomeData() {
        return movieService.getHomeData();
    }


    @Operation(summary = "Get just released movies", description = "Retrieve a page of movies that just released for the homepage")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/new")
    public ResponseEntity<ResponseInfiniteScroll> getJustReleased(@RequestParam Integer page, @RequestParam Integer size) {
        return movieService.getJustReleased(page, size);
    }


    @Operation(summary = "Get a movie by id", description = "Retrieve all the data of a movie obtained by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movie data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/{movieId}")
    public ResponseEntity<ResponseMoviePage> getMovieById(@PathVariable Long movieId, @RequestParam Long userId) {
        return movieService.getMovieById(movieId, userId);
    }


    @Operation(summary = "Search movie by search parameter", description = "Retrieve a page of movies with a title or actor name similar to search input. " +
            "Can be ordered by ReleaseDate or Rating, and Ascending or Descending order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/search")
    public ResponseEntity<ResponseInfiniteScroll> getMoviesBySearchParam(@RequestParam String input, @ParameterObject Pageable pageable, @RequestParam Long userId, @RequestParam(required = false) Set<Long> genreId) {
        return movieService.getMoviesBySearchParam(input, pageable, userId, genreId);
    }

    @Operation(summary = "Rate Movie", description = "Adds a new rating to the movie.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully added movie rating"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist ",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "404", description = "User with the passed movieId does not exist ",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error adding rating to movie", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/{movieId}/rate/{userId}")
    public ResponseEntity<Movie> addRating(@PathVariable Long movieId, @PathVariable Long userId, @RequestBody RequestAddRating rating) {
        return movieService.addRating(movieId, userId, rating);
    }
}
