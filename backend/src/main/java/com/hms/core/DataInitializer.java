package com.hms.core;

import com.hms.model.User;
import com.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create test users for each role
        createUserIfNotFound("doctor", "doctor@example.com", "password", User.Role.DOCTOR);
        createUserIfNotFound("patient", "patient@example.com", "password", User.Role.PATIENT);
        createUserIfNotFound("staff", "staff@example.com", "password", User.Role.STAFF);
        createUserIfNotFound("admin", "admin@example.com", "password", User.Role.ADMIN);
    }

    private void createUserIfNotFound(String username, String email, String password, User.Role role) {
        if (!userRepository.existsByUsername(username)) {
            User user = new User(
                    username,
                    email,
                    passwordEncoder.encode(password),
                    role
            );
            userRepository.save(user);
            System.out.println("Created user: " + username + " with role: " + role);
        }
    }
}
