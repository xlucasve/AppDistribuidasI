package com.MoviePlay.backendapi.models;

import com.MoviePlay.backendapi.dtos.responses.ResponseMovieInScroll;

import java.util.ArrayList;
import java.util.List;


public class MovieScroll {

    private List<ResponseMovieInScroll> moviesData = new ArrayList<>();
    private Integer count;
    private String genreName;

    public MovieScroll() {
    }

    public MovieScroll(List<ResponseMovieInScroll> moviesData, Integer count, String genreName) {
        this.moviesData = moviesData;
        this.count = count;
        this.genreName = genreName;
    }

    public List<ResponseMovieInScroll> getMoviesData() {
        return moviesData;
    }

    public void setMoviesData(List<ResponseMovieInScroll> moviesData) {
        this.moviesData = moviesData;
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
