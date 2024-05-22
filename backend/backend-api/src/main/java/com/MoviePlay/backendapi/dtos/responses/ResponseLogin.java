package com.MoviePlay.backendapi.dtos.responses;

public record ResponseLogin(
        String accessToken,
        String refreshToken
) {
}
