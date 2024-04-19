package com.MoviePlay.backendapi.models;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieScroll {

    private List<ResponseMovieInScroll> sidescroll = new ArrayList<>();
    private Integer count;
    private String title;
}
