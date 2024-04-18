package com.MoviePlay.backendapi.models;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;

import java.util.ArrayList;
import java.util.List;

public class MovieScroll {

    private List<ResponseMovieInScroll> sidescroll = new ArrayList<>();
    private Integer count;
    private String title;
}
