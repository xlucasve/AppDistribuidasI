package com.MoviePlay.backendapi.services;


import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.repositories.ActorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ActorService {
    private final ActorRepository actorRepository;

    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public Set<Movie> getMoviesFromActorBySearchParam(String input, Pageable pageable) {
        Page<Actor> actorsPage = actorRepository.findAllByNameContainsIgnoreCase(input, pageable);
        Set<Movie> moviesFromActors = new HashSet<>();
        for (Actor actor : actorsPage) {
            moviesFromActors.addAll(actor.getMoviesAppeared());
        }
        return moviesFromActors;
    }
}
