package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestCreateMovie;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.exceptions.ApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {


    @Operation(summary = "Get movies for homepage", description = "Retrieve a list of movies that are to be shown is the homepage. " +
            "The response object contains a list for movies that are to be shown in the big mode, and a list of movies to be shown in sidescrolls.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content (
                    mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
    )}
            )
    })
    @GetMapping("/")
    public ResponseEntity<ResponseHomeData> getHomeData(){
        return null;
    }


    @Operation(summary = "Get just released movies", description = "Retrieve a page of movies that just released for the homepage")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/new")
    public ResponseEntity<ResponseInfiniteScroll> getJustReleased(@ParameterObject Pageable pageable){
        return null;
    }




    @Operation(summary = "Get a movie by id", description = "Retrieve all the data of a movie obtained by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movie data", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/{movieId}")
    public ResponseEntity<ResponseMovieInScroll> getMovieById(@PathVariable Long movieId){
        return null;
    }




    @Operation(summary = "Search movie by search parameter", description = "Retrieve a page of movies with a name or actor name similar to search input")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining movies data", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/search")
    public ResponseEntity<Movie> getMoviesBySearchParam(@RequestParam String input, @ParameterObject Pageable pageable){
        return null;
    }




    @Operation(summary = "Create a new movie", description = "Create a new movie to be stored in the database. Only to be used by admins")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully created movie"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "400", description = "Invalid body input",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error creating movie", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/")
    public ResponseEntity<Movie> createMovie(@RequestBody RequestCreateMovie movieData){
        return null;
    }




    @Operation(summary = "Add actor to movie cast", description = "Add an actor to the cast of the movie. The actor is passed by its id. The actor has to previously exist in the database.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully added actor to movie cast"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "404", description = "Actor with the passed actorId does not exist",content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            ),
            @ApiResponse(responseCode = "500", description = "Internal Server Error adding actor to movie cast", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PutMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> addActorToMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }




    @Operation(summary = "Remove actor from movie cast", description = "Remove an actor to the cast of the movie. The actor is passed by its id. The actor has to previously exist in the database.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully removed actor from movie cast"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "404", description = "Actor with the passed actorId does not exist",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error removing actor to movie cast", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> removeActorFromMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }




    @Operation(summary = "Delete movie from database", description = "Delete a movie from the database. Only to be used by admins")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully deleted movie"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist",
                    content = {
                            @Content (
                                    mediaType = "application/json",
                                    schema = @Schema(
                                            implementation = ApiException.class
                                    )
                            )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error removing movie from database", content = {
                    @Content (
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long movieId){
        return null;
    }
}
