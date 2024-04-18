package com.MoviePlay.backendapi.controllers;

import com.MoviePlay.backendapi.dtos.requests.RequestCreateActor;
import com.MoviePlay.backendapi.entities.Actor;
import com.MoviePlay.backendapi.exceptions.ApiException;
import com.MoviePlay.backendapi.services.ActorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/actor")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @Operation(summary = "Create Actor", description = "Create an actor and store it in the database")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully created actor"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "400", description = "Invalid Actor body", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error creating actor", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/")
    public ResponseEntity<Actor> createActor(@RequestBody RequestCreateActor actorData){
        return null;
    }



    @Operation(summary = "Delete Actor", description = "Delete an actor from the database")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully deleted actor"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "No actor found with passed actorId", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error deleting actor", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/{actorId}")
    public ResponseEntity<String> deleteActorById(@PathVariable Long actorId){
        return null;
    }
}
