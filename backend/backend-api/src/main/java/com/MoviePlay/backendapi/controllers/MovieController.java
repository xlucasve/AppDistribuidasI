package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestCreateMovie;
import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.exceptions.ApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {


    @Operation(summary = "Get movies for homepage", description = "Retrieve a list of movies that are to be shown is the homepage. " +
            "The response object contains a list for movies that are to be shown in the big mode, and a list of movies to be shown in sidescrolls.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies for homepage"),
            @ApiResponse(responseCode = "500", description = "Error obtaining movies data", content = {
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

    @Operation(summary = "Get a movie by id", description = "Retrieve all the data of a movie obtained by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies for homepage"),
            @ApiResponse(responseCode = "500", description = "Error obtaining movies data")
    })
    @GetMapping("/{movieId}")
    public ResponseEntity<ResponseMovieInScroll> getMovieById(@PathVariable Long movieId){
        return null;
    }

    @GetMapping("/search")
    public ResponseEntity<Movie> getMoviesBySearchParam(@RequestParam String input){
        return null;
    }

    @PostMapping("/")
    public ResponseEntity<Movie> createMovie(@RequestBody RequestCreateMovie movieData){
        return null;
    }

    @PutMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> addActorToMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }

    @DeleteMapping("/{movieId}/actor/{actorId}")
    public ResponseEntity<Movie> removeActorFromMovie(@PathVariable Long movieId, @PathVariable Long actorId){
        return null;
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long movieId){
        return null;
    }
}
