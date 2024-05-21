package com.MoviePlay.backendapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "actors")
public class Actor {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long actorId;
    private String name;
    private String portraitImageLink;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "actor_movies",
            joinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "actorId"),
            inverseJoinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId")
    )
    @JsonIgnore
    private List<Movie> moviesAppeared = new ArrayList<>();

    public Actor(Long actorId, String name, String portraitImageLink, List<Movie> moviesAppeared) {
        this.actorId = actorId;
        this.name = name;

        this.portraitImageLink = portraitImageLink;
        this.moviesAppeared = moviesAppeared;
    }

    public Actor() {
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Actor actor = (Actor) o;
        return getActorId() != null && Objects.equals(getActorId(), actor.getActorId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

    public void setActorId(Long actorId) {
        this.actorId = actorId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPortraitImageLink(String portraitImageLink) {
        this.portraitImageLink = portraitImageLink;
    }

    public void setMoviesAppeared(List<Movie> moviesAppeared) {
        this.moviesAppeared = moviesAppeared;
    }

    public Long getActorId() {
        return this.actorId;
    }

    public String getName() {
        return this.name;
    }


    public String getPortraitImageLink() {
        return this.portraitImageLink;
    }

    public List<Movie> getMoviesAppeared() {
        return this.moviesAppeared;
    }
}
