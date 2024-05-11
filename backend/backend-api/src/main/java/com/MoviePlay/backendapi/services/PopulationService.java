package com.MoviePlay.backendapi.services;


import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.entities.Genre;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.repositories.ActorRepository;
import com.MoviePlay.backendapi.repositories.GenreRepository;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PopulationService {

    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;
    private final GenreRepository genreRepository;

    public PopulationService(MovieRepository movieRepository, ActorRepository actorRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.actorRepository = actorRepository;
        this.genreRepository = genreRepository;
    }

    public String populateDB(List<Movie> data) {
        for (Movie movie : data) {
            movie = avoidMovieRepeatedData(movie);
            Movie savedMovie = movieRepository.save(movie);
            addActorMovieRelationship(savedMovie, savedMovie.getActors());
        }
        return "Worked";
    }


    private Movie avoidMovieRepeatedData(Movie movie){
        movie = avoidMovieRepeatedGenres(movie);
        movie = avoidMovieRepeatedActors(movie);
        movie = avoidMovieRepeatedDirectors(movie);
        return movie;
    }

    private Movie avoidMovieRepeatedGenres(Movie movie) {
        List<Genre> movieNewGenreList = new ArrayList<>();
        for (Genre genre : movie.getGenres()) {
            Optional<Genre> foundGenre = genreRepository.findByName(genre.getName());
            if (foundGenre.isPresent()) {
                movieNewGenreList.add(foundGenre.get());
            } else {
                Genre savedGenre = genreRepository.save(genre);
                movieNewGenreList.add(savedGenre);
            }
        }
        movie.setGenres(movieNewGenreList);
        return movie;
    }

    private Movie avoidMovieRepeatedActors(Movie movie) {
        List<Actor> movieNewActorsList = new ArrayList<>();
        for (Actor actor : movie.getActors()) {
            Optional<Actor> foundActor = actorRepository.findByName(actor.getName());
            if (foundActor.isPresent()) {
                movieNewActorsList.add(foundActor.get());
            } else {
                Actor savedActor = actorRepository.save(actor);
                movieNewActorsList.add(savedActor);
            }
        }
        movie.setActors(movieNewActorsList);
        return movie;
    }

    private Movie avoidMovieRepeatedDirectors(Movie movie) {
        List<Actor> movieNewDirectorsList = new ArrayList<>();
        for (Actor actor : movie.getDirectors()) {
            Optional<Actor> foundActor = actorRepository.findByName(actor.getName());
            if (foundActor.isPresent()) {
                movieNewDirectorsList.add(foundActor.get());
            } else {
                Actor savedActor = actorRepository.save(actor);
                movieNewDirectorsList.add(savedActor);
            }
        }
        movie.setDirectors(movieNewDirectorsList);
        return movie;
    }

    private void addActorMovieRelationship(Movie movie, List<Actor> actors){
        for (Actor actor : actors){
            Actor foundActor = actorRepository.findByName(actor.getName()).get();
            List<Movie> actorMovies = foundActor.getMoviesAppeared();
            actorMovies.add(movie);
            foundActor.setMoviesAppeared(actorMovies);
            actorRepository.save(foundActor);
        }
    }
}
