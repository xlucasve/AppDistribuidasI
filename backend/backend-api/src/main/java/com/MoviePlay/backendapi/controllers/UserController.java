package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserData(@PathVariable Long userId){
        return null;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUserEmail(@PathVariable Long userId){
        return null;
    }

    @PutMapping("/{userId}/image")
    public ResponseEntity<UserResponse> updateUserProfilePicture(@PathVariable Long userId, MultipartFile imageFile){
        return null;
    }

    @PostMapping("/{userId}/movie/{movieId}")
    public ResponseEntity<UserResponse> addMovieToFavorites(@PathVariable Long userId, @PathVariable Long movieId){
        return null;
    }

    @DeleteMapping("/{userId}/movie/{movieId}")
    public ResponseEntity<UserResponse> deleteMovieFromFavorites(@PathVariable Long userId, @PathVariable Long movieId){
        return null;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){
        return null;
    }

    @GetMapping("/{userId}/favorite")
    public ResponseEntity<ResponseInfiniteScroll> getUserFavoriteMovies(@PathVariable Long userId){
        return null;
    }
}
