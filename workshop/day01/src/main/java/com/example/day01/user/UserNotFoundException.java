package com.example.day01.user;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String id) {
        super(id);
    }
}
