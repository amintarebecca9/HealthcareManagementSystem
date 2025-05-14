package com.hms.service.impl;

import com.hms.dto.ConversationDto;
import com.hms.dto.MessageDto;
import com.hms.model.*;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.MessageNotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecureMessageServiceImplTest {

    @InjectMocks
    private SecureMessageServiceImpl service;

    @Mock
    private MessageNotificationRepository msgRepo;

    @Mock
    private AppointmentRepository apptRepo;

    private User sender, receiver;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sender = new User(); sender.setId(1L); sender.setUsername("alice");
        receiver = new User(); receiver.setId(2L); receiver.setUsername("bob");
    }

    @Test
    void sendMessage_savesAndReturnsEntity() {
        MessageNotification m = new MessageNotification(sender, receiver, null, "TYPE", "hello", false, false, 10L, 20L);
        when(msgRepo.save(any())).thenReturn(m);

        MessageNotification result = service.sendMessage(sender, receiver, "TYPE", "hello", 10L, 20L);
        assertSame(m, result);
        verify(msgRepo).save(argThat(arg ->
                arg.getSender().equals(sender)
                        && arg.getReceiver().equals(receiver)
                        && "TYPE".equals(arg.getType())
                        && "hello".equals(arg.getContent())
                        && !arg.getIsRead()
        ));
    }

    @Test
    void getInbox_delegatesToRepo() {
        List<MessageNotification> inbox = List.of(new MessageNotification());
        when(msgRepo.findByReceiverOrderByTimestampDesc(receiver))
                .thenReturn(inbox);

        List<MessageNotification> result = service.getInbox(receiver);
        assertSame(inbox, result);
        verify(msgRepo).findByReceiverOrderByTimestampDesc(receiver);
    }

    @Test
    void getSent_delegatesToRepo() {
        List<MessageNotification> sent = List.of(new MessageNotification());
        when(msgRepo.findBySenderOrderByTimestampDesc(sender))
                .thenReturn(sent);

        List<MessageNotification> result = service.getSent(sender);
        assertSame(sent, result);
        verify(msgRepo).findBySenderOrderByTimestampDesc(sender);
    }

    @Test
    void markAsRead_success() {
        MessageNotification m = new MessageNotification(sender, receiver, null, "T","C", false, false, null, null);
        when(msgRepo.findById(5L)).thenReturn(Optional.of(m));

        service.markAsRead(5L, receiver);

        assertTrue(m.getIsRead());
        verify(msgRepo).save(m);
    }

    @Test
    void markAsRead_notFound_throws404() {
        when(msgRepo.findById(99L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> service.markAsRead(99L, receiver));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void markAsRead_wrongUser_throws403() {
        MessageNotification m = new MessageNotification(sender, receiver, null, "T","C", false, false, null, null);
        when(msgRepo.findById(7L)).thenReturn(Optional.of(m));

        User other = new User(); other.setId(3L);
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> service.markAsRead(7L, other));
        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }

    @Test
    void listConversations_patientBranch() {
        // because Role enum never equals string "DOCTOR", code always takes the first branch
        User me = new User(); me.setId(2L); me.setRole(User.Role.PATIENT); me.setUsername("bob");

        // stub appointmentRepo.findDistinctDoctorsByPatientId
        Doctor d1 = new Doctor(); d1.setDoctorId(10L); d1.setUser(sender);
        when(apptRepo.findDistinctDoctorsByPatientId(2L)).thenReturn(List.of(d1));

        // stub unread counts
        when(msgRepo.countUnread(10L, 2L)).thenReturn(5L);

        List<ConversationDto> convs = service.listConversations(me);
        assertEquals(1, convs.size());
        ConversationDto c = convs.get(0);
        assertEquals(10L, c.partnerId());
        assertEquals("alice", c.partnerName());
        assertEquals(5L, c.unreadCount());
    }

    @Test
    void fetchAndMarkRead_marksUnreadAndReturnsDtos() {
        User me = receiver;  // bob
        User other = sender;// alice

        // prepare messages: one unread for bob, one read for bob, one sent by bob
        MessageNotification m1 = new MessageNotification(other, me, null, "T","one", false, false, null, null);
        m1.setMessageId(1L);
        MessageNotification m2 = new MessageNotification(other, me, null, "T","two", true, false, null, null);
        m2.setMessageId(2L);
        MessageNotification m3 = new MessageNotification(me, other, null, "T","three", false, false, null, null);
        m3.setMessageId(3L);

        List<MessageNotification> all = List.of(m1, m2, m3);
        when(msgRepo.findConversation(2L, 1L)).thenReturn(all);

        List<MessageDto> dtos = service.fetchAndMarkRead(me, 1L);
        // m1 was unread and receiver==me => now read and saved
        assertTrue(m1.getIsRead());
        verify(msgRepo).save(m1);
        // m2 was already read => no extra save
        // m3 was sent by me => not receiver => no save

        // verify returned DTOs match
        assertEquals(3, dtos.size());
        MessageDto dto1 = dtos.stream().filter(d->d.id()==1L).findFirst().get();
        assertEquals("one", dto1.content());
    }
}
