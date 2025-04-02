package com.example.day01;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @GetMapping("/user/{id}")
    public UserResponse getUserById(@PathVariable int id) {
        return new UserResponse();
    }

}
