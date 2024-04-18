package com.MoviePlay.backendapi.exceptions.custom;
import lombok.Getter;
import org.springframework.validation.BindingResult;

@Getter
public class BindingResultException extends RuntimeException{
    private final BindingResult bindingResult;

    public BindingResultException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
    }

}
