package com.MoviePlay.backendapi.exceptions;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;
import java.util.List;

public record BindingResultErrorDetails(List<String> errors, HttpStatus httpStatus, ZonedDateTime timestamp) {

}
