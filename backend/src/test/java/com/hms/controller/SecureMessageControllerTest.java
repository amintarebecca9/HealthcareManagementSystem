package com.hms.controller;

import com.hms.dto.ConversationDto;
import com.hms.dto.MessageDto;
import com.hms.model.MessageNotification;
import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.service.SecureMessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecureMessageControllerTest {

    @InjectMocks
    private SecureMessageController controller;

    @Mock
    private SecureMessageService msgService;

    @Mock
    private UserRepository userRepo;

    @Mock
    private Authentication auth;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    //
    // 1) send(...)
    //

    @Test
    void send_success() {
        when(auth.getName()).thenReturn("alice");
        User sender = new User(); sender.setId(1L); sender.setUsername("alice");
        when(userRepo.findByUsername("alice")).thenReturn(Optional.of(sender));

        User receiver = new User(); receiver.setId(2L); receiver.setUsername("bob");
        when(userRepo.findById(2L)).thenReturn(Optional.of(receiver));

        MessageNotification notif = new MessageNotification();
        when(msgService.sendMessage(sender, receiver, "CHAT", "hello", 10L, 20L))
                .thenReturn(notif);

        MessageNotification result = controller.send(auth, 2L, "CHAT", "hello", 10L, 20L);
        assertSame(notif, result);
        verify(msgService).sendMessage(sender, receiver, "CHAT", "hello", 10L, 20L);
    }

    @Test
    void send_noSender_then401() {
        when(auth.getName()).thenReturn("unknown");
        when(userRepo.findByUsername("unknown")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.send(auth, 2L, "CHAT", "hi", null, null));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void send_noReceiver_then404() {
        when(auth.getName()).thenReturn("alice");
        User sender = new User(); sender.setId(1L); sender.setUsername("alice");
        when(userRepo.findByUsername("alice")).thenReturn(Optional.of(sender));
        when(userRepo.findById(99L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.send(auth, 99L, "CHAT", "hi", null, null));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    //
    // 2) inbox(...)
    //

    @Test
    void inbox_success() {
        when(auth.getName()).thenReturn("carol");
        User user = new User(); user.setId(3L); user.setUsername("carol");
        when(userRepo.findByUsername("carol")).thenReturn(Optional.of(user));

        List<MessageNotification> inbox = List.of(new MessageNotification());
        when(msgService.getInbox(user)).thenReturn(inbox);

        List<MessageNotification> result = controller.inbox(auth);
        assertEquals(inbox, result);
    }

    @Test
    void inbox_noUser_then401() {
        when(auth.getName()).thenReturn("nobody");
        when(userRepo.findByUsername("nobody")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.inbox(auth));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 3) sent(...)
    //

    @Test
    void sent_success() {
        when(auth.getName()).thenReturn("dave");
        User user = new User(); user.setId(4L); user.setUsername("dave");
        when(userRepo.findByUsername("dave")).thenReturn(Optional.of(user));

        List<MessageNotification> sent = List.of(new MessageNotification());
        when(msgService.getSent(user)).thenReturn(sent);

        List<MessageNotification> result = controller.sent(auth);
        assertEquals(sent, result);
    }

    @Test
    void sent_noUser_then401() {
        when(auth.getName()).thenReturn("ghost");
        when(userRepo.findByUsername("ghost")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.sent(auth));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 4) markRead(...)
    //

    @Test
    void markRead_success() {
        when(auth.getName()).thenReturn("eve");
        User user = new User(); user.setId(5L); user.setUsername("eve");
        when(userRepo.findByUsername("eve")).thenReturn(Optional.of(user));

        // no exception => success
        assertDoesNotThrow(() -> controller.markRead(auth, 42L));
        verify(msgService).markAsRead(42L, user);
    }

    @Test
    void markRead_noUser_then401() {
        when(auth.getName()).thenReturn("nobody");
        when(userRepo.findByUsername("nobody")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.markRead(auth, 42L));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 5) listConversations(...)
    //

    @Test
    void listConversations_success() {
        when(auth.getName()).thenReturn("frank");
        User user = new User(); user.setId(6L); user.setUsername("frank");
        when(userRepo.findByUsername("frank")).thenReturn(Optional.of(user));

        // instantiate ConversationDto with its 3 args
        List<ConversationDto> conv = List.of(
                new ConversationDto(99L, "otherUser", 4L)
        );
        when(msgService.listConversations(user)).thenReturn(conv);

        List<ConversationDto> result = controller.listConversations(auth);
        assertEquals(conv, result);
    }

    @Test
    void listConversations_noUser_then401() {
        when(auth.getName()).thenReturn("nobody");
        when(userRepo.findByUsername("nobody")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.listConversations(auth));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 6) getHistory(...)
    //

    @Test
    void getHistory_success() {
        when(auth.getName()).thenReturn("george");
        User user = new User(); user.setId(7L); user.setUsername("george");
        when(userRepo.findByUsername("george")).thenReturn(Optional.of(user));
        MessageDto msg = new MessageDto(
                10L,                                      // id
                7L,                                       // senderId
                42L,                                      // receiverId  (example)
                "CHAT",                                   // type        (e.g. CHAT, ALERT, etc.)
                "hello!",                                 // content
                null,                                     // prescriptionId (if none)
                null,                                     // labReportId    (if none)
                LocalDateTime.of(2025, 5, 14, 15, 0),     // timestamp
                false                                     // read flag
        );
        List<MessageDto> msgs = List.of(msg);
        when(msgService.fetchAndMarkRead(user, 99L)).thenReturn(msgs);

        List<MessageDto> result = controller.getHistory(99L, auth);
        assertEquals(msgs, result);
    }

    @Test
    void getHistory_noUser_then401() {
        when(auth.getName()).thenReturn("nobody");
        when(userRepo.findByUsername("nobody")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.getHistory(99L, auth));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }
}
