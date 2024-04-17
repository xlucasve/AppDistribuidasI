package com.MoviePlay.backendapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controllerrr {

    @GetMapping
    public String getWorkingStatus(){
        return "It is working wonderfully";
    }
}
