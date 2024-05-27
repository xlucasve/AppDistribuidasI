package com.MoviePlay.backendapi.utils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/keep")
public class KeepAlive {

    @GetMapping("/")
    public String working(){
        return "Working";
    }
}
