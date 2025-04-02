package com.example.day01.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.context.SpringBootTest.*;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    @DisplayName("ทำการดึงข้อมูลของ user id = 1 สำเร็จ")
    void getUserById() {
        UserResponse actualResult
                = restTemplate.getForObject("/user/1", UserResponse.class);
        assertEquals(1, actualResult.getId());
        assertEquals("Somkiat", actualResult.getFirst_name());
        assertEquals("somkiat@xx.com", actualResult.getEmail());

    }
}