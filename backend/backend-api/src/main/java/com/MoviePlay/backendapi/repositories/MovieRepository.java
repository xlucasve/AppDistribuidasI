package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Page<Movie> findAllByOrderByReleaseDateDesc(Pageable pageable);

    Page<Movie> findAllByRatingGreaterThanEqual(Pageable pageable, double rating);

    @Query("SELECT m FROM Movie m JOIN m.genres g WHERE g.name= :genre AND m.movieId NOT IN :excludedIds")
    Page<Movie> findAllByGenreExcludingIds(@Param("genre") String genre, @Param("excludedIds") Set<Long> excludedIds, Pageable pageable);
    Optional<Movie> findByTitle(String title);

    Page<Movie> findAllByTitleContainsIgnoreCase(String input, Pageable pageable);
}
