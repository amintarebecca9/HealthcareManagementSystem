package com.hms.controller;

import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.auth.payload.LoginRequest;
import com.hms.auth.payload.MessageResponse;
import com.hms.auth.payload.SignupRequest;
import com.hms.auth.payload.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
        
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        
        // Generate a simpler token format that's easier to handle
        // Note: For a real application, use a proper JWT library
        String token = user.getUsername() + ":" + user.getRole() + ":" + System.currentTimeMillis();
        String encodedToken = Base64.getEncoder().encodeToString(token.getBytes());
        
        System.out.println("Generated token for " + user.getUsername() + ": " + encodedToken);
        
        return ResponseEntity.ok(new JwtResponse(
                encodedToken,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getRole(),
                true);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
