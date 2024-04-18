package com.MoviePlay.backendapi.dtos.responses;

public record UserResponse(
        Long userId,
        String email,
        String nickname,
        String profilePictureLink) {
}
