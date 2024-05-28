package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestUpdateNickname;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.UserResponse;
import com.MoviePlay.backendapi.exceptions.ApiException;
import com.MoviePlay.backendapi.services.ImageService;
import com.MoviePlay.backendapi.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final ImageService imageService;

    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @Operation(summary = "Get user data", description = "Retrieves the data from the user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining user data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserData(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @Operation(summary = "Change user nickname", description = "Changes the user nickname. Doesn´t have filters.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully changed user nickname"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error changing user nickname", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PutMapping("/{userId}/nickname")
    public ResponseEntity<UserResponse> updateUserNickname(@PathVariable Long userId, @RequestBody RequestUpdateNickname request) {
        return userService.updateUserNickname(userId, request);
    }

    @Operation(summary = "Change User profile picture", description = "Changes a user profile picture. Picture is then stored as an url for frontend use." +
            "Doesnt change profile picture in case of error")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully changed profile picture"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error changing profile picture", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PutMapping("/{userId}/images")
    public ResponseEntity<UserResponse> updateUserProfilePicture(@RequestPart("image") MultipartFile file, @PathVariable Long userId){
        return userService.changeUserImage(file, userId);
    }

    @Operation(summary = "Add movie to user Favorites", description = "Adds a movie to the user favorites list")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved movies from user favorites"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error favorites data", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/{userId}/movies/{movieId}")
    public ResponseEntity<UserResponse> addMovieToFavorites(@PathVariable Long userId, @PathVariable Long movieId) {
        return null;
    }


    @Operation(summary = "Remove movie from favorites", description = "Remove a movie from a user favorites list")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully removed movie from user favorites"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "404", description = "Movie with the passed movieId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error deleting movie from favorites", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/{userId}/movies/{movieId}")
    public ResponseEntity<UserResponse> deleteMovieFromFavorites(@PathVariable Long userId, @PathVariable Long movieId) {
        return null;
    }


    @Operation(summary = "Get favorite movies from user", description = "Retrieve the list of favorite movies from the user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved favorite movies data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error obtaining favorite movies", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<ResponseInfiniteScroll> getUserFavoriteMovies(@PathVariable Long userId) {
        return null;
    }

}
