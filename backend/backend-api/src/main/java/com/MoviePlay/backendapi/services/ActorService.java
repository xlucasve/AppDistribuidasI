package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.responses.ResponseHomeData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ActorService {
    public ResponseEntity<ResponseHomeData> getAllActors() {
        return new ResponseEntity<>(new ResponseHomeData(), HttpStatus.OK);
    }
}
