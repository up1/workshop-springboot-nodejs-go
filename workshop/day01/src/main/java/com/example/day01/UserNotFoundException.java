package com.example.day01;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String id) {
        super(id);
    }
}
