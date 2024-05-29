package com.MoviePlay.backendapi.dtos.requests;

public record RequestRefreshToken(String accessToken, String refreshToken, Long userId) {
}
