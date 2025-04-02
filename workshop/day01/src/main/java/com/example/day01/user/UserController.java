package com.example.day01.user;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @GetMapping("/user/{id}")
    public UserResponse getUserById(@PathVariable int id) {
        if(id ==2) {
            throw new UserNotFoundException(String.valueOf(id));
        }
//        Hard code
        UserResponse userResponse = new UserResponse();
        userResponse.setId(id);
        userResponse.setFirst_name("Somkiat");
        userResponse.setEmail("somkiat@xx.com");
        userResponse.setAge(35);
        return userResponse;
    }

}
