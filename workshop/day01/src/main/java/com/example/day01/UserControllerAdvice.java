package com.example.day01;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserControllerAdvice {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<UserErrorResponse> userNotFound(UserNotFoundException e){
        UserErrorResponse response = new UserErrorResponse();
        response.setMessage("User id=" + e.getMessage() + " not found");
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(404));
    }

}
