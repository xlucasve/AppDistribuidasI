package com.MoviePlay.backendapi.models;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;

import java.util.ArrayList;
import java.util.List;


public class MovieScroll {

    private List<ResponseMovieInScroll> sidescroll = new ArrayList<>();
    private Integer count;
    private String title;

    public MovieScroll() {
    }

    public MovieScroll(List<ResponseMovieInScroll> sidescroll, Integer count, String title) {
        this.sidescroll = sidescroll;
        this.count = count;
        this.title = title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
