package com.MoviePlay.backendapi.dtos.requests;

public record RequestLogin(String userEmail, String realName, String nickname, String profilePictureLink) {
}
