package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import com.MoviePlay.backendapi.services.ActorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @GetMapping("/movie")
    public ResponseEntity<ResponseHomeData> getAllActors(){
        return actorService.getAllActors();
    }
}
