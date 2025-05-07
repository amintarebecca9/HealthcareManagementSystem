package com.hms.repository;

import com.hms.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;
import com.hms.core.HealthcareManagementSystemApplication;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ContextConfiguration(classes = HealthcareManagementSystemApplication.class)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByUsername() {
        // Create and persist a test user
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole(User.Role.PATIENT);
        
        entityManager.persist(user);
        entityManager.flush();
        
        // Test finding the user by username
        Optional<User> found = userRepository.findByUsername("testuser");
        
        // Assert
        assertTrue(found.isPresent());
        assertEquals("testuser", found.get().getUsername());
    }

    @Test
    public void testExistsByUsername() {
        // Create and persist a test user
        User user = new User();
        user.setUsername("existinguser");
        user.setEmail("exists@example.com");
        user.setPassword("password");
        user.setRole(User.Role.DOCTOR);
        
        entityManager.persist(user);
        entityManager.flush();
        
        // Test if username exists
        boolean exists = userRepository.existsByUsername("existinguser");
        boolean nonExists = userRepository.existsByUsername("nonexistinguser");
        
        // Assert
        assertTrue(exists);
        assertFalse(nonExists);
    }

    @Test
    public void testExistsByEmail() {
        // Create and persist a test user
        User user = new User();
        user.setUsername("emailuser");
        user.setEmail("email@example.com");
        user.setPassword("password");
        user.setRole(User.Role.STAFF);
        
        entityManager.persist(user);
        entityManager.flush();
        
        // Test if email exists
        boolean exists = userRepository.existsByEmail("email@example.com");
        boolean nonExists = userRepository.existsByEmail("nonemail@example.com");
        
        // Assert
        assertTrue(exists);
        assertFalse(nonExists);
    }
}
