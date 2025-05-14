package com.hms.config;

import com.hms.model.User;
import com.hms.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthTokenFilterTest {

    @InjectMocks
    private AuthTokenFilter authTokenFilter;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // inject the mock repository into the filter
        ReflectionTestUtils.setField(authTokenFilter, "userRepository", userRepository);
        // clear any leftover authentication
        SecurityContextHolder.clearContext();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void whenNoAuthorizationHeader_thenNoAuthenticationSet_andFilterChainInvoked() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn(null);

        authTokenFilter.doFilter(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication(), "Authentication should be null");
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void whenInvalidBase64Token_thenNoAuthenticationSet_andFilterChainInvoked() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("Bearer not-a-base64!");

        authTokenFilter.doFilter(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void whenMalformedToken_thenNoAuthenticationSet_andFilterChainInvoked() throws ServletException, IOException {
        // encode a string without colon => parts.length < 2
        String badToken = Base64.getEncoder().encodeToString("justUsername".getBytes());
        when(request.getHeader("Authorization")).thenReturn("Bearer " + badToken);

        authTokenFilter.doFilter(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void whenUserNotFound_thenNoAuthenticationSet_andFilterChainInvoked() throws ServletException, IOException {
        String payload = "ghost:ignored";
        String token = Base64.getEncoder().encodeToString(payload.getBytes());
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(userRepository.findByUsername("ghost")).thenReturn(Optional.empty());

        authTokenFilter.doFilter(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(userRepository).findByUsername("ghost");
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void whenValidTokenAndUserExists_thenAuthenticationIsSet_andFilterChainInvoked() throws ServletException, IOException {
        User user = new User();
        user.setUsername("alice");
        user.setRole(User.Role.ADMIN);  // assume Role is an enum inside User
        String payload = "alice:anything";
        String token = Base64.getEncoder().encodeToString(payload.getBytes());

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));

        authTokenFilter.doFilter(request, response, filterChain);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assertNotNull(auth, "Authentication should have been set");
        assertEquals("alice", auth.getName(), "Username should match");
        assertTrue(auth.getAuthorities().stream()
                        .anyMatch(granted -> granted.getAuthority().equals("ROLE_ADMIN")),
                "Should have ROLE_ADMIN authority");

        verify(filterChain).doFilter(request, response);
    }
}
