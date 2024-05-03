package com.MoviePlay.backendapi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long movieId;
    private String title;


    @Column(length=1000)
    private String synopsis;


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "genreId")
    )
    @JsonManagedReference
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
    @JsonManagedReference
    private List<Actor> actors = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "movie_directors",
            joinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "actorId")
    )
    @JsonManagedReference
    private List<Actor> directors = new ArrayList<>();

    @ManyToMany(mappedBy = "favoriteMovies", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<User> favoritedBy = new ArrayList<>();

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

    public Movie() {
    }

    public Movie(Long movieId, String title, String synopsis, List<Genre> genres, String trailerLink, String posterImageLink, Double rating, Integer voteCount, List<Image> galleryImagesLink, Integer hourLength, Integer minuteLength, LocalDate releaseDate, List<Actor> actors, List<Actor> directors, List<User> favoritedBy) {
        this.movieId = movieId;
        this.title = title;
        this.synopsis = synopsis;
        this.genres = genres;
        this.trailerLink = trailerLink;
        this.posterImageLink = posterImageLink;
        this.rating = rating;
        this.voteCount = voteCount;
        this.galleryImagesLink = galleryImagesLink;
        this.hourLength = hourLength;
        this.minuteLength = minuteLength;
        this.releaseDate = releaseDate;
        this.actors = actors;
        this.directors = directors;
        this.favoritedBy = favoritedBy;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public String getTrailerLink() {
        return trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public String getPosterImageLink() {
        return posterImageLink;
    }

    public void setPosterImageLink(String posterImageLink) {
        this.posterImageLink = posterImageLink;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public List<Image> getGalleryImagesLink() {
        return galleryImagesLink;
    }

    public void setGalleryImagesLink(List<Image> galleryImagesLink) {
        this.galleryImagesLink = galleryImagesLink;
    }

    public Integer getHourLength() {
        return hourLength;
    }

    public void setHourLength(Integer hourLength) {
        this.hourLength = hourLength;
    }

    public Integer getMinuteLength() {
        return minuteLength;
    }

    public void setMinuteLength(Integer minuteLength) {
        this.minuteLength = minuteLength;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public List<Actor> getActors() {
        return actors;
    }

    public void setActors(List<Actor> actors) {
        this.actors = actors;
    }

    public List<Actor> getDirectors() {
        return directors;
    }

    public void setDirectors(List<Actor> directors) {
        this.directors = directors;
    }

    public List<User> getFavoritedBy() {
        return favoritedBy;
    }

    public void setFavoritedBy(List<User> favoritedBy) {
        this.favoritedBy = favoritedBy;
    }
}
