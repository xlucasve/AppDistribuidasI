package com.MoviePlay.backendapi.security.auth.config;

import com.MoviePlay.backendapi.entities.User;
import com.MoviePlay.backendapi.repositories.UserRepository;
import com.MoviePlay.backendapi.security.token.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final TokenRepository tokenRepository;
  private final UserRepository userRepository;

  public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, TokenRepository tokenRepository,
                                 UserRepository userRepository) {
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    if (request.getServletPath().contains("/api/v1/auth")) {
      filterChain.doFilter(request, response);
      return;
    }
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }
    System.out.println("WE FOUND A JWT");
    jwt = authHeader.substring(7);
    System.out.println("JWT FOUND: " + jwt);
    userEmail = jwtService.extractEmail(jwt);
    System.out.println("USER EMAIL: " + userEmail);
    System.out.println("SECURITY CONTEXT: " +  SecurityContextHolder.getContext().getAuthentication());
    if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      User user = userRepository.findByEmail(userEmail).get();
      var isTokenValid = tokenRepository.findByToken(jwt)
          .map(t -> !t.isExpired() && !t.isRevoked())
          .orElse(false);
      System.out.println("TOKEN WAS FOUND VALID");
      System.out.println("IS VALID: " + jwtService.isTokenValid(jwt, user));
      if (jwtService.isTokenValid(jwt, user) && isTokenValid) {
        System.out.println("SERVICE FOUND TOKEN VALID");
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            user,
            null,
                user.getAuthorities()

        );
        System.out.println("TOKEN1" + authToken.isAuthenticated());
        authToken.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );
        System.out.println("TOKEN2" + authToken);
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }
    filterChain.doFilter(request, response);
  }
}
