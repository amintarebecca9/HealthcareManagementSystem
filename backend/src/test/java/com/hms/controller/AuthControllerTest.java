package com.hms.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.auth.payload.LoginRequest;
import com.hms.auth.payload.SignupRequest;
import com.hms.core.HealthcareManagementSystemApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = HealthcareManagementSystemApplication.class)
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        // Create test users for the tests
        createTestUser("doctor", "doctor@example.com", "password", User.Role.DOCTOR);
        createTestUser("patient", "patient@example.com", "password", User.Role.PATIENT);
        createTestUser("staff", "staff@example.com", "password", User.Role.STAFF);
        createTestUser("admin", "admin@example.com", "password", User.Role.ADMIN);
    }

    private void createTestUser(String username, String email, String password, User.Role role) {
        // Only create if user doesn't exist to avoid duplicates during test runs
        if (!userRepository.existsByUsername(username)) {
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password)); // Important: encode the password!
            user.setRole(role);

            userRepository.save(user);
            System.out.println("Created user: " + username + " with role: " + role);
        }
    }

    @Test
    public void testRegisterUserDuplicateUsername() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("patient");
        signupRequest.setEmail("new@example.com");
        signupRequest.setPassword("password");
        signupRequest.setRole(User.Role.PATIENT); // Fixed: Using enum instead of string

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Error: Username is already taken!"));
    }

    @Test
    public void testAuthenticateUser() throws Exception {
        // First create a testuser for authentication test
        createTestUser("testuser", "testuser@example.com", "password", User.Role.PATIENT);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password");  // Use the plain password here

        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }
}
