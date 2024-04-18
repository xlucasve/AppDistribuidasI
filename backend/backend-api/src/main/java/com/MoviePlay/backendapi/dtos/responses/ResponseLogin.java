package com.MoviePlay.backendapi.dtos.responses;

public record ResponseLogin(
        String token,
        String refreshToken
) {
}
