package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.responses.ResponseHealthCheck;
import com.MoviePlay.backendapi.entities.enums.HealthStatus;
import com.MoviePlay.backendapi.exceptions.ApiException;
import com.MoviePlay.backendapi.repositories.GenreRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class ApiHealthController {

    private final GenreRepository genreRepository;

    public ApiHealthController(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Operation(summary = "Check API Health Status", description = "Check status of the API and its Database.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully checked api health"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error checking status", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @GetMapping("/")
    public ResponseEntity<ResponseHealthCheck> healthCheck() {
        genreRepository.findById(1L);
        return new ResponseEntity<>(new ResponseHealthCheck(HealthStatus.UP, HealthStatus.UP), HttpStatus.OK);
    }
}
