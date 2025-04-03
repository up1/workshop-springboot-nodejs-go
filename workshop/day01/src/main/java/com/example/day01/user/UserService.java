package com.example.day01.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getData(int id) {
        userRepository.deleteAll();
        userRepository.save(new MyUser());
        userRepository.save(new MyUser());

        // Call external service timeout 10 secs

        Optional<MyUser> result = userRepository.findById(id);
        if(result.isEmpty()) {
            throw new UserNotFoundException(String.valueOf(id));
        }
        MyUser foundUser = result.get();
        UserResponse userResponse = new UserResponse();
        userResponse.setId(id);
        userResponse.setFirst_name(foundUser.getFirstName());
        userResponse.setEmail(foundUser.getEmail());
        userResponse.setAge(foundUser.getAge());
        return userResponse;
    }
}
