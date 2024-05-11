package com.MoviePlay.backendapi.models;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;
import com.MoviePlay.backendapi.entities.Genre;

import java.util.ArrayList;
import java.util.List;


public class MovieScroll {

    private List<ResponseMovieInScroll> sidescroll = new ArrayList<>();
    private Integer count;
    private String genreName;

    public MovieScroll() {
    }

    public MovieScroll(List<ResponseMovieInScroll> sidescroll, Integer count, String genreName) {
        this.sidescroll = sidescroll;
        this.count = count;
        this.genreName = genreName;
    }

    public List<ResponseMovieInScroll> getSidescroll() {
        return sidescroll;
    }

    public void setSidescroll(List<ResponseMovieInScroll> sidescroll) {
        this.sidescroll = sidescroll;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }
}
