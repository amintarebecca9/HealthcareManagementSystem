package com.hms.repository;

import com.hms.core.HealthcareManagementSystemApplication;
import com.hms.model.MessageNotification;
import com.hms.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import java.time.LocalDateTime;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ContextConfiguration(classes = HealthcareManagementSystemApplication.class)
public class MessageNotificationRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private MessageNotificationRepository messageRepository;

    private User createUser(String username, String email) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword("password"); // plain, not used in repo tests
        user.setRole(User.Role.PATIENT);
        return entityManager.persistFlushFind(user);
    }

    private MessageNotification createMessage(User sender, User receiver, LocalDateTime when) {
        MessageNotification msg = new MessageNotification();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setTimestamp(when);
        msg.setType("note");
        msg.setContent("content");
        msg.setIsEncrypted(false);
        msg.setIsRead(false);
        return entityManager.persistFlushFind(msg);
    }

    @Test
    public void testFindByReceiverOrderByTimestampDesc() {
        User alice = createUser("alice", "alice@example.com");
        User bob   = createUser("bob",   "bob@example.com");

        LocalDateTime t1 = LocalDateTime.now().minusHours(1);
        LocalDateTime t2 = LocalDateTime.now();

        // Two messages to Bob
        createMessage(alice, bob, t1);
        createMessage(alice, bob, t2);

        List<MessageNotification> inbox = messageRepository.findByReceiverOrderByTimestampDesc(bob);
        assertThat(inbox).hasSize(2);
        assertThat(inbox.get(0).getTimestamp()).isAfter(inbox.get(1).getTimestamp());
    }

    @Test
    public void testFindBySenderOrderByTimestampDesc() {
        User charlie = createUser("charlie", "charlie@example.com");
        User dave    = createUser("dave",    "dave@example.com");

        LocalDateTime t1 = LocalDateTime.now().minusDays(1);
        LocalDateTime t2 = LocalDateTime.now();

        // Two messages from Charlie
        createMessage(charlie, dave, t1);
        createMessage(charlie, dave, t2);

        List<MessageNotification> sent = messageRepository.findBySenderOrderByTimestampDesc(charlie);
        assertThat(sent).hasSize(2);
        assertThat(sent.get(0).getTimestamp()).isAfter(sent.get(1).getTimestamp());
    }
}
