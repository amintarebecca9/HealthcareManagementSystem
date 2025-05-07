package com.hms.service;

import com.hms.model.MessageNotification;
import com.hms.model.User;
import com.hms.repository.MessageNotificationRepository;
import com.hms.service.impl.SecureMessageServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecureMessageServiceImplTest {

    @Mock
    private MessageNotificationRepository msgRepo;

    @Mock
    private EncryptionService crypto;

    @InjectMocks
    private SecureMessageServiceImpl service;

    private User sender;
    private User receiver;
    private MessageNotification msg;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sender = new User(); sender.setId(1L);
        receiver = new User(); receiver.setId(2L);
        msg = new MessageNotification();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setTimestamp(LocalDateTime.now());
        msg.setType("note");
        msg.setContent("encrypted");
        msg.setIsEncrypted(true);
        msg.setIsRead(false);
    }

    @Test
    void testSendMessage() {
        when(crypto.encrypt("hello")).thenReturn("enc");
        when(msgRepo.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        MessageNotification result = service.sendMessage(sender, receiver, "note", "hello", null, null);

        ArgumentCaptor<MessageNotification> captor = ArgumentCaptor.forClass(MessageNotification.class);
        verify(msgRepo).save(captor.capture());
        MessageNotification saved = captor.getValue();

        assertThat(saved.getContent()).isEqualTo("enc");
        assertTrue(saved.getIsEncrypted());
        assertFalse(saved.getIsRead());
        assertThat(result.getSender()).isEqualTo(sender);
        assertThat(result.getReceiver()).isEqualTo(receiver);
    }

    @Test
    void testGetInboxDecrypts() {
        MessageNotification m1 = new MessageNotification();
        m1.setIsEncrypted(true);
        m1.setContent("enc1");
        MessageNotification m2 = new MessageNotification();
        m2.setIsEncrypted(false);
        m2.setContent("plain");
        when(msgRepo.findByReceiverOrderByTimestampDesc(receiver)).thenReturn(Arrays.asList(m1, m2));
        when(crypto.decrypt("enc1")).thenReturn("plain1");

        List<MessageNotification> inbox = service.getInbox(receiver);

        assertThat(inbox.get(0).getContent()).isEqualTo("plain1");
        assertFalse(inbox.get(0).getIsEncrypted());
        assertThat(inbox.get(1).getContent()).isEqualTo("plain");
    }

    @Test
    void testGetSentDecrypts() {
        MessageNotification m1 = new MessageNotification();
        m1.setIsEncrypted(true);
        m1.setContent("enc2");
        when(msgRepo.findBySenderOrderByTimestampDesc(sender)).thenReturn(List.of(m1));
        when(crypto.decrypt("enc2")).thenReturn("plain2");

        List<MessageNotification> sent = service.getSent(sender);

        assertThat(sent).hasSize(1);
        assertThat(sent.get(0).getContent()).isEqualTo("plain2");
    }

    @Test
    void testMarkAsReadSuccess() {
        msg.setReceiver(receiver);
        when(msgRepo.findById(10)).thenReturn(Optional.of(msg));

        service.markAsRead(10, receiver);

        assertTrue(msg.getIsRead());
        verify(msgRepo).save(msg);
    }

    @Test
    void testMarkAsReadUnauthorized() {
        msg.setReceiver(new User()); // different user
        when(msgRepo.findById(10)).thenReturn(Optional.of(msg));

        Exception ex = assertThrows(RuntimeException.class,
                () -> service.markAsRead(10, receiver));
        assertThat(ex.getMessage()).isEqualTo("Unauthorized");
    }

    @Test
    void testMarkAsReadNotFound() {
        when(msgRepo.findById(999)).thenReturn(Optional.empty());

        Exception ex = assertThrows(RuntimeException.class,
                () -> service.markAsRead(999, receiver));
        assertThat(ex.getMessage()).isEqualTo("Message not found");
    }
}
