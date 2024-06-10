package com.MoviePlay.backendapi.security.auth;

import com.MoviePlay.backendapi.dtos.requests.RequestLogin;
import com.MoviePlay.backendapi.dtos.requests.RequestRefreshToken;
import com.MoviePlay.backendapi.dtos.responses.ResponseLogin;
import com.MoviePlay.backendapi.dtos.responses.ResponseRefresh;
import com.MoviePlay.backendapi.exceptions.ApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final AuthenticationService service;

    public AuthController(AuthenticationService service) {
        this.service = service;
    }

    @Operation(summary = "Login user", description = "Lets a user log in. If the user account doesn´t exist, it creates the account." +
            " Returns the JWT to authenticate the user while using the app.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully logged user in"),
            @ApiResponse(responseCode = "400", description = "Invalid login body", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error logging user in", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(@RequestBody RequestLogin requestLogin){
        return ResponseEntity.ok(service.login(requestLogin));
    }


    @Operation(summary = "Refresh JWT Token", description = "Refreshes the user JWT Token so that they can continue using the app while being verified.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully refreshed token"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "400", description = "Invalid token body", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error refreshing token", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @PostMapping("/refresh")
    public ResponseRefresh refreshToken(@RequestBody RequestRefreshToken request) {
        return service.refreshToken(request);
    }

    @Operation(summary = "Logout user", description = "Logs an user out and deactivates their jwt token.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully logged user out"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error logging user out", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/logout/{userId}")
    public ResponseEntity<?> logoutUser(@PathVariable Long userId){return service.logout(userId);}

   @Operation(summary = "Delete user", description = "Delete a user and all its related data.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully deleted user"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request/Invalid token"),
            @ApiResponse(responseCode = "404", description = "User with the passed userId does not exist", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error deleting user", content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiException.class
                            )
                    )}
            )
    })
    @DeleteMapping("/delete-account/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        return service.deleteUser(userId);
    }
}
