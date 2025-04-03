package com.example.day01.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("เจอข้อมูลของ user id = 1")
    public void case01(){
        // Arrange
        MyUser user1 = new MyUser();
        user1.setFirstName("Test");
        userRepository.save(user1);
        // Act
        Optional<MyUser> result = userRepository.findById(1);
        // Assert
        assertFalse(result.isEmpty());
        assertEquals("Test", result.get().getFirstName());
    }

}