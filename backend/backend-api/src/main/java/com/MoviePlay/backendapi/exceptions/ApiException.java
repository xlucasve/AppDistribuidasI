package com.MoviePlay.backendapi.exceptions;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public record ApiException(String errorMessage, HttpStatus httpStatus, ZonedDateTime timestamp) {

}