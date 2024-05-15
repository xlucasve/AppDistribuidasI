package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Page<Movie> findAllByOrderByReleaseDateDesc(Pageable pageable);
    Optional<Movie> findByTitle(String title);
}
