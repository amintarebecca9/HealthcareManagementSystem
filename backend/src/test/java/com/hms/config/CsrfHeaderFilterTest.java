package com.hms.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.security.web.csrf.CsrfToken;

import java.io.IOException;

import static org.mockito.Mockito.*;

class CsrfHeaderFilterTest {

    private CsrfHeaderFilter filter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Mock
    private CsrfToken csrfToken;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        filter = new CsrfHeaderFilter();
    }

    @Test
    void whenNoCsrfToken_thenHeaderNotSet_andChainContinues() throws ServletException, IOException {
        // no CsrfToken attribute
        when(request.getAttribute(CsrfToken.class.getName())).thenReturn(null);

        filter.doFilter(request, response, filterChain);

        // header should never be set
        verify(response, never()).setHeader(eq("X-CSRF-TOKEN"), any());
        // filter chain always invoked
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void whenCsrfTokenPresent_thenHeaderSet_andChainContinues() throws ServletException, IOException {
        // attribute returns a CsrfToken
        when(request.getAttribute(CsrfToken.class.getName())).thenReturn(csrfToken);
        when(csrfToken.getToken()).thenReturn("dummyToken");

        filter.doFilter(request, response, filterChain);

        // header should be set with the token value
        verify(response).setHeader("X-CSRF-TOKEN", "dummyToken");
        // still invoke the chain
        verify(filterChain).doFilter(request, response);
    }
}
