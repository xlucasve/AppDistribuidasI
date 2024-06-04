package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.dtos.requests.RequestUpdateNickname;
import com.MoviePlay.backendapi.dtos.responses.UserResponse;
import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.utils.DTOMapper;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class UserService {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final DTOMapper dtoMapper;

    public UserService(ImageService imageService, UserRepository userRepository, DTOMapper dtoMapper) {
        this.imageService = imageService;
        this.userRepository = userRepository;
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
}
