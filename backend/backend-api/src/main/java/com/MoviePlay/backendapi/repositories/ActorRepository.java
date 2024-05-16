package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Actor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Long> {
    Optional<Actor> findByName(String name);

    @Query("SELECT a FROM Actor a WHERE a.name LIKE %?1%")
    Page<Actor> findAllByName(String name, Pageable pageable);
}
