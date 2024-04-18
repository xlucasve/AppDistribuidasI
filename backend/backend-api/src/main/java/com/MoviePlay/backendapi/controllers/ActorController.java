package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestCreateActor;
import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.services.ActorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @GetMapping("/movie")
    public ResponseEntity<List<Actor>> getAllActors(){
        return null;
    }

    @PostMapping("/")
    public ResponseEntity<Actor> createActor(@RequestBody RequestCreateActor actorData){
        return null;
    }
}
