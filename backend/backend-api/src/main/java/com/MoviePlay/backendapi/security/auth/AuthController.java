package com.MoviePlay.backendapi.security.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @PostMapping("/register")
    public void register(){

    }

    @PostMapping("/login")
    public void login(){

    }

    @PostMapping("/refresh")
    public void refreshToken(){

    }
}
