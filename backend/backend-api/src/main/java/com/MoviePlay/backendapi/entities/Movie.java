package com.MoviePlay.backendapi.entities;

import com.MoviePlay.backendapi.entities.enums.Genre;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long movieId;
    private String title;
    private String subtitle;
    private String synopsis;
    private List<Genre> genres = new ArrayList<>();
    private String trailerLink;
    private String posterImageLink;
    private Double rating;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Image> galleryImagesLink = new ArrayList<>();
    private Integer hourLength;
    private Integer minuteLength;
    private LocalDate releaseDate;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "movie_cast",
            joinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "actorId")
    )
    private List<Actor> cast = new ArrayList<>();
    @ManyToMany(mappedBy = "favoriteMovies")
    private List<User> favorites = new ArrayList<>();
}
