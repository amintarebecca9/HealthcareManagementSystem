package com.hms.core;

import com.hms.auth.User;
import com.hms.auth.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class DataInitializerTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private DataInitializer dataInitializer;
    
    @Test
    public void testInitializeData() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
        
        // Act
        dataInitializer.run(null);
        
        // Assert - verify users were created for different roles
        verify(userRepository, atLeast(1)).save(any(User.class));
        
        // You would typically verify more specific user creation based on your initialization logic
        verify(passwordEncoder, atLeast(1)).encode(anyString());
    }
    
    @Test
    public void testNoInitializationWhenUsersExist() {
        // Arrange - simulate users already exist
        when(userRepository.existsByUsername(anyString())).thenReturn(true);
        
        // Act
        dataInitializer.run(null);
        
        // Assert - verify no users were saved
        verify(userRepository, never()).save(any(User.class));
    }
}
