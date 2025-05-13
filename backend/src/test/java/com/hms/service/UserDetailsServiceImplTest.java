package com.hms.service;

import com.hms.model.User;
import com.hms.core.HealthcareManagementSystemApplication;
import com.hms.repository.UserRepository;
import com.hms.service.impl.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = HealthcareManagementSystemApplication.class)
public class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    private User testUser;

    @BeforeEach
    public void setup() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("password");
        testUser.setEmail("test@example.com");
        testUser.setRole(User.Role.PATIENT);
    }

    @Test
    public void testLoadUserByUsername_Success() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername("testuser");
        
        assertNotNull(userDetails);
        assertEquals("testuser", userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_PATIENT")));
    }

    @Test
    public void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        
        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("nonexistent");
        });
    }
}
