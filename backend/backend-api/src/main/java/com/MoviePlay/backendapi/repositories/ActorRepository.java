package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Actor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Long> {
    Optional<Actor> findByName(String name);

    Page<Actor> findAllByNameContainsIgnoreCase(String name, Pageable pageable);
}
