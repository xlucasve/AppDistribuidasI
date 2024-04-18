package com.MoviePlay.backendapi.security.auth;

import com.MoviePlay.backendapi.dtos.responses.ResponseLogin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<ResponseLogin> register(){
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(){
        return null;
    }

    @PostMapping("/refresh")
    public ResponseEntity<ResponseLogin> refreshToken(){
        return null;
    }
}
