package com.MoviePlay.backendapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    @Column(length=3000)
    private String synopsis;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "genreId")
    )
    private List<Genre> genres = new ArrayList<>();
    private String trailerLink;
    private String posterImageLink;
    private Double rating;
    private Integer voteCount;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
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
    @ManyToMany(mappedBy = "favoriteMovies", fetch = FetchType.LAZY)
    private List<User> favorites = new ArrayList<>();

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Movie movie = (Movie) o;
        return getMovieId() != null && Objects.equals(getMovieId(), movie.getMovieId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
