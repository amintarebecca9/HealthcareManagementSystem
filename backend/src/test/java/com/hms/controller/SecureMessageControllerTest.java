package com.hms.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.auth.payload.LoginRequest;
import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.repository.MessageNotificationRepository;
import com.hms.core.HealthcareManagementSystemApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = HealthcareManagementSystemApplication.class)
@AutoConfigureMockMvc
public class SecureMessageControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UserRepository userRepository;
    @Autowired private MessageNotificationRepository messageRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private User sender;
    private User receiver;

    @BeforeEach
    public void setUp() {
        // Clear existing data to avoid FK constraint issues
        messageRepository.deleteAll();
        userRepository.deleteAll();

        sender = createTestUser("sender", "sender@example.com", "password", User.Role.DOCTOR);
        receiver = createTestUser("receiver", "receiver@example.com", "password", User.Role.PATIENT);
    }

    private User createTestUser(String username, String email, String password, User.Role role) {
        return userRepository.findByUsername(username)
                .orElseGet(() -> {
                    User user = new User();
                    user.setUsername(username);
                    user.setEmail(email);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(role);
                    return userRepository.save(user);
                });
    }

    private String obtainToken(String username, String password) throws Exception {
        LoginRequest login = new LoginRequest();
        login.setUsername(username);
        login.setPassword(password);
        MvcResult result = mockMvc.perform(post("/api/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode root = objectMapper.readTree(result.getResponse().getContentAsString());
        return root.get("token").asText();
    }

    @Test
    public void testSendAndReceiveMessage() throws Exception {
        String tokenSender = obtainToken("sender", "password");
        // Send message
        mockMvc.perform(post("/api/secure-messages/send")
                        .header("Authorization", "Bearer " + tokenSender)
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("toUserId", receiver.getId().toString())
                        .param("type", "note")
                        .param("content", "Hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sender.username").value("sender"))
                .andExpect(jsonPath("$.receiver.username").value("receiver"))
                .andExpect(jsonPath("$.type").value("note"));

        // Fetch inbox as receiver
        String tokenReceiver = obtainToken("receiver", "password");
        mockMvc.perform(get("/api/secure-messages/inbox")
                        .header("Authorization", "Bearer " + tokenReceiver))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Hello"))
                .andExpect(jsonPath("$[0].isRead").value(false));
    }

    @Test
    public void testMarkAsRead() throws Exception {
        String tokenSender = obtainToken("sender", "password");
        // Send message
        MvcResult sendResult = mockMvc.perform(post("/api/secure-messages/send")
                        .header("Authorization", "Bearer " + tokenSender)
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("toUserId", receiver.getId().toString())
                        .param("type", "note")
                        .param("content", "MarkTest"))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode sentNode = objectMapper.readTree(sendResult.getResponse().getContentAsString());
        int messageId = sentNode.get("messageId").asInt();

        // Mark as read
        String tokenReceiver = obtainToken("receiver", "password");
        mockMvc.perform(post("/api/secure-messages/" + messageId + "/read")
                        .header("Authorization", "Bearer " + tokenReceiver))
                .andExpect(status().isNoContent());

        // Verify it's read
        mockMvc.perform(get("/api/secure-messages/inbox")
                        .header("Authorization", "Bearer " + tokenReceiver))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].isRead").value(true));
    }
}
