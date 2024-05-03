package com.MoviePlay.backendapi.services;


import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.entities.Genre;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.repositories.ActorRepository;
import com.MoviePlay.backendapi.repositories.GenreRepository;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PopulationService {

    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;
    private final GenreRepository genreRepository;

    public String populateDB(List<Movie> data){
        for (Movie movie: data){
            movie = fixMovieRepeatedGenres(movie);
            movie = fixMovieRepeatedActors(movie);
            movie = fixMovieRepeatedDirectors(movie);
            movieRepository.save(movie);
        }
        return "Worked";
    }

    private Movie fixMovieRepeatedGenres(Movie movie){
        List<Genre> movieNewGenreList = new ArrayList<>();
        for (Genre genre : movie.getGenres()){
            Optional<Genre> foundGenre = genreRepository.findByName(genre.getName());
            if (foundGenre.isPresent()){
                movieNewGenreList.add(foundGenre.get());
            }else{
                Genre savedGenre = genreRepository.save(genre);
                movieNewGenreList.add(savedGenre);
            }
        }
        movie.setGenres(movieNewGenreList);
        return movie;
    }

    private Movie fixMovieRepeatedActors(Movie movie){
        List<Actor> movieNewActorsList = new ArrayList<>();
        for (Actor actor : movie.getActors()){
            Optional<Actor> foundActor = actorRepository.findByName(actor.getName());
            if (foundActor.isPresent()){
                movieNewActorsList.add(foundActor.get());
            }else{
                Actor savedActor = actorRepository.save(actor);
                movieNewActorsList.add(savedActor);
            }
        }
        movie.setActors(movieNewActorsList);
        return movie;
    }

    private Movie fixMovieRepeatedDirectors(Movie movie){
        List<Actor> movieNewDirectorsList = new ArrayList<>();
        for (Actor actor : movie.getDirectors()){
            Optional<Actor> foundActor = actorRepository.findByName(actor.getName());
            if (foundActor.isPresent()){
                movieNewDirectorsList.add(foundActor.get());
            }else{
                Actor savedActor = actorRepository.save(actor);
                movieNewDirectorsList.add(savedActor);
            }
        }
        movie.setDirectors(movieNewDirectorsList);
        return movie;
    }
}
