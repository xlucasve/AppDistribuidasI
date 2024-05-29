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
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
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
    if (storedUser.isEmpty()){
      //Stores user if user does not previously exist
      return loginNewUser(request);
    }
    return loginExistingUser(storedUser);
  }

  private ResponseLogin loginExistingUser(Optional<User> storedUser) {
    User user = storedUser.get();

    List<Token> userTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());

    Token accessToken = null;
    Token refreshToken = null;

    for (Token token : userTokens){
      if (token.getTokenType() == TokenType.ACCESS){
        accessToken = token;
      } else{
        refreshToken = token;
      }
    }
    return new ResponseLogin(accessToken.getToken(), refreshToken.getToken(), user.getUserId());
  }

  private ResponseLogin loginNewUser(RequestLogin request){

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
      var user = this.userRepository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        ResponseLogin authResponse = new ResponseLogin(accessToken, refreshToken, user.getUserId());
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
