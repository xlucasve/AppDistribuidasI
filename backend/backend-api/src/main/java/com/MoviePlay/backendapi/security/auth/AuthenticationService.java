package com.MoviePlay.backendapi.security.auth;

import com.MoviePlay.backendapi.dtos.requests.RequestLogin;
import com.MoviePlay.backendapi.dtos.responses.ResponseLogin;
import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.security.auth.config.JwtService;
import com.MoviePlay.backendapi.security.token.Token;
import com.MoviePlay.backendapi.security.token.TokenRepository;
import com.MoviePlay.backendapi.security.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(UserRepository repository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
    this.repository = repository;
    this.tokenRepository = tokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public ResponseLogin login(RequestLogin request) {
    User user = new User();
    user.setEmail(request.userEmail());
    user.setActive(true);
    user.setRealName(request.realName());
    user.setNickname(request.nickname());
    user.setProfilePictureLink(request.profilePictureLink());
    User savedUser;


    /*TODO: If user is found, check if its tokens are valid
    If they are valid, return them
    If they are invalid, generate them

      */
    Optional<User> storedUser = repository.findByEmail(user.getEmail());
      savedUser = storedUser.orElseGet(() -> repository.save(user));
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return new ResponseLogin(jwtToken, refreshToken);
  }


  private void saveUserToken(User user, String jwtToken) {
    Token token = new Token(jwtToken, TokenType.BEARER, false, false, user);
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

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;

    //TODO: Make it so that it only accepts RefreshToken

    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractEmail(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        ResponseLogin authResponse = new ResponseLogin(accessToken, refreshToken);
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
