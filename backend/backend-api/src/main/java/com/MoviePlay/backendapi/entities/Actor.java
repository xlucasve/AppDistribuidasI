package com.MoviePlay.backendapi.entities;

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
public class Actor {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long actorId;
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    private String portraitImageLink;
    @ManyToMany()
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId")
    )
    private List<Movie> favorites = new ArrayList<>();
}
