package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.responses.ResponseHealthCheck;
import com.MoviePlay.backendapi.exceptions.ApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class ApiHealthController {

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
    public ResponseEntity<ResponseHealthCheck> healthCheck(){return null;}
}
