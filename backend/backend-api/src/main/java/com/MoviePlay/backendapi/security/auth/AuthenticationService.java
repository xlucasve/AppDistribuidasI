package com.MoviePlay.backendapi.security.auth;

import com.MoviePlay.backendapi.dtos.requests.RequestLogin;
import com.MoviePlay.backendapi.dtos.requests.RequestRefreshToken;
import com.MoviePlay.backendapi.dtos.responses.ResponseLogin;
import com.MoviePlay.backendapi.dtos.responses.ResponseRefresh;
import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.security.auth.config.JwtService;
import com.MoviePlay.backendapi.security.token.Token;
import com.MoviePlay.backendapi.security.token.TokenRepository;
import com.MoviePlay.backendapi.security.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    public AuthenticationService(UserRepository userRepository, TokenRepository tokenRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }

    public ResponseLogin login(RequestLogin request) {


        Optional<User> storedUser = userRepository.findByEmail(request.userEmail());
        if (storedUser.isEmpty()) {
            //Stores user if user does not previously exist
            return loginNewUser(request);
        }
        return loginExistingUser(storedUser);
    }

    private ResponseLogin loginExistingUser(Optional<User> storedUser) {
        User user = storedUser.get();
        String accessToken = null;
        String refreshToken = null;

        List<Token> userTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (userTokens.isEmpty()){
            accessToken = jwtService.generateToken(user);
            refreshToken = jwtService.generateRefreshToken(user);

            saveUserToken(user, accessToken, TokenType.ACCESS);
            saveUserToken(user, refreshToken, TokenType.REFRESH);
        } else {
            for (Token token : userTokens) {
                if (token.getTokenType() == TokenType.ACCESS) {
                    accessToken = token.getToken();
                } else {
                    refreshToken = token.getToken();
                }
            }
            //Case when refreshToken works but access token is invalid
            if (accessToken == null){
                accessToken = jwtService.generateToken(user);
            }
        }
        return new ResponseLogin(accessToken, refreshToken, user.getUserId());
    }

    private ResponseLogin loginNewUser(RequestLogin request) {

        User newUser = new User();
        newUser.setEmail(request.userEmail());
        newUser.setActive(true);
        newUser.setRealName(request.realName());
        newUser.setNickname(request.nickname());
        newUser.setProfilePictureLink(request.profilePictureLink());
        User user = userRepository.save(newUser);

        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(user, accessToken, TokenType.ACCESS);
        saveUserToken(user, refreshToken, TokenType.REFRESH);
        return new ResponseLogin(accessToken, refreshToken, user.getUserId());
    }


    private void saveUserToken(User user, String jwtToken, TokenType tokenType) {
        Token token = new Token(jwtToken, tokenType, false, false, user);
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void revokeUserAccessTokens(User user){
        List<Token> revokedTokens = new ArrayList<>();
        var validUserAccessTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserAccessTokens.isEmpty()){
            return;
        }
        for (Token token : validUserAccessTokens){
            if (token.getTokenType() == TokenType.ACCESS){
                token.setExpired(true);
                token.setRevoked(true);
                revokedTokens.add(token);
            }
        }
        tokenRepository.saveAll(revokedTokens);
    }

    public ResponseRefresh refreshToken(
            RequestRefreshToken request
    ) {
        String userRefreshToken = request.refreshToken();
        Long userId = request.userId();

        //Check if user with userId exists
        //Check if tokens belong to user
        //Check if refresh token is still usable
        //Make new token pair and save them
        //Return response

        //TODO: Make it so that it only accepts RefreshToken

        Optional<User> storedUser = userRepository.findById(userId);
        if (storedUser.isEmpty()) {
            throw new EntityNotFoundException("User with passed user Id does not exist");
        }

        User user = storedUser.get();

        Optional<Token> foundRefreshToken = tokenRepository.findByToken(userRefreshToken);

        if (foundRefreshToken.isEmpty()) {
            throw new EntityNotFoundException("No refresh token found with that token");
        }

        if (foundRefreshToken.get().isExpired() || foundRefreshToken.get().isRevoked()) {
            throw new EntityNotFoundException("Refresh token is expired or revoked");
        }

        List<Token> userTokens = tokenRepository.findAllValidTokenByUser(userId);
        Token storedRefreshToken = null;
        for (Token token : userTokens) {
            if (token.getTokenType() == TokenType.REFRESH) {
                storedRefreshToken = token;
            }
        }

        if (!Objects.equals(storedRefreshToken.getToken(), foundRefreshToken.get().getToken())) {
            throw new EntityNotFoundException("Refresh token found doesnt belong to user");
        }
        //Make custom exception for refresh token not
        
        var accessToken = jwtService.generateToken(user);
        revokeUserAccessTokens(user);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        return new ResponseRefresh(accessToken);

    }


    public ResponseEntity<?> logout(Long userId){
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("No user found with id: " + userId);
        }
        revokeAllUserTokens(foundUser.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> deleteUser(Long userId) {
        Optional<User> foundUser = userRepository.findById(userId);
        if (foundUser.isEmpty()){
            throw new EntityNotFoundException("No user found with id: " + userId);
        }

        userRepository.deleteById(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
