package com.MoviePlay.backendapi.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "movie_ratings")
public class MovieRating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long movieRatingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie ratedMovie;

    public MovieRating() {
    }

    public MovieRating(Long movieRatingId, User user, Integer rating, Movie ratedMovie) {
        this.movieRatingId = movieRatingId;
        this.user = user;
        this.rating = rating;
        this.ratedMovie = ratedMovie;
    }


    public Long getMovieRatingId() {
        return movieRatingId;
    }

    public void setMovieRatingId(Long movieRatingId) {
        this.movieRatingId = movieRatingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Movie getRatedMovie() {
        return ratedMovie;
    }

    public void setRatedMovie(Movie ratedMovie) {
        this.ratedMovie = ratedMovie;
    }
}
