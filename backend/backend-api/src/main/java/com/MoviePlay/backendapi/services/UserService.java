package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.requests.RequestUpdateNickname;
import com.MoviePlay.backendapi.dtos.responses.ResponseInfiniteScroll;
import com.MoviePlay.backendapi.dtos.responses.UserResponse;
import com.MoviePlay.backendapi.entities.Movie;
import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.repositories.MovieRepository;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.utils.DTOMapper;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final DTOMapper dtoMapper;

    public UserService(ImageService imageService, UserRepository userRepository, MovieRepository movieRepository, DTOMapper dtoMapper) {
        this.imageService = imageService;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.dtoMapper = dtoMapper;
    }

    public ResponseEntity<UserResponse> getUserById(Long userId){
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        return new ResponseEntity<>(dtoMapper.userToUserResponse(foundUser.get()), HttpStatus.OK);
    }

    public ResponseEntity<UserResponse> changeUserImage(MultipartFile file, Long userId){
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        String newImageUrl = imageService.uploadImage(file, userId);

        User user = foundUser.get();
        user.setProfilePictureLink(newImageUrl);
        User storedUser = userRepository.save(user);

        return new ResponseEntity<>(dtoMapper.userToUserResponse(storedUser), HttpStatus.OK);
    }

    public ResponseEntity<UserResponse> updateUserNickname(Long userId, RequestUpdateNickname request) {
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        Optional<User> userWithSameNickname = userRepository.findByNickname(request.nickname());
        if (userWithSameNickname.isPresent() && !userWithSameNickname.get().getUserId().equals(userId)) {
            throw new EntityExistsException();
        }


        User user = foundUser.get();

        user.setNickname(request.nickname());
        User storedUser = userRepository.save(user);

        return new ResponseEntity<>(dtoMapper.userToUserResponse(storedUser), HttpStatus.OK);
    }

    public ResponseEntity<ResponseInfiniteScroll> getUserFavoriteMovies(Long userId, Integer pageNumber, Integer ammountPerPage) {
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        if (pageNumber > 0) {
            pageNumber--;
        }

        if (pageNumber < 0){
            pageNumber = 0;
        }

        List<Movie> userFavoriteMovies = foundUser.get().getFavoriteMovies();

        int startingPoint = Math.min(userFavoriteMovies.size(), pageNumber*ammountPerPage);
        int endingPoint = Math.min(userFavoriteMovies.size(), (pageNumber+1)*ammountPerPage);


        List<Movie> partitionList = userFavoriteMovies.subList(startingPoint, endingPoint);
        ResponseInfiniteScroll response = new ResponseInfiniteScroll(dtoMapper.listMovieToListMovieInScroll(partitionList));

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    public ResponseEntity<UserResponse> addMovieToFavorites(Long userId, Long movieId) {
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        User user = foundUser.get();

        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            throw new EntityNotFoundException("Movie id with id: " + movieId + " does not exist");
        }

        List<Movie> userFavoriteMovies = user.getFavoriteMovies();
        if (!userFavoriteMovies.contains(movie.get())){
            userFavoriteMovies.add(movie.get());
        }
        user.setFavoriteMovies(userFavoriteMovies);

        userRepository.save(user);
        UserResponse response = dtoMapper.userToUserResponse(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<UserResponse> deleteMovieFromFavorites(Long userId, Long movieId) {
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("User with id: " + userId + " was not found");
        }

        User user = foundUser.get();

        List<Movie> userFavoriteMovies = user.getFavoriteMovies();
        userFavoriteMovies.removeIf(movie -> Objects.equals(movie.getMovieId(), movieId));
        user.setFavoriteMovies(userFavoriteMovies);

        userRepository.save(user);
        UserResponse response = dtoMapper.userToUserResponse(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
