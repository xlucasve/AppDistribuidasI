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
@Table(name = "actors")
public class Actor {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long actorId;
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    private String portraitImageLink;
    @ManyToMany(mappedBy = "cast")
    private List<Movie> moviesAppeared = new ArrayList<>();
}
