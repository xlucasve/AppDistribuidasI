package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.MovieRating;
import com.MoviePlay.backendapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MovieRatingRepository extends JpaRepository<MovieRating, Long> {

    @Query("SELECT mr FROM MovieRating mr where mr.user=?1 and mr.ratedMovie=?2")
    Optional<MovieRating> findExistingRating(User user, Movie movie);
}
