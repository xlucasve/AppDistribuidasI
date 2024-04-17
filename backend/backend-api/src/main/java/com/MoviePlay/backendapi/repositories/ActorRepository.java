package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Long> {
}
