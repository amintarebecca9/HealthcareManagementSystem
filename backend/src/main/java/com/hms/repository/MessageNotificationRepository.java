package com.hms.repository;

import com.hms.model.MessageNotification;
import com.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageNotificationRepository extends JpaRepository<MessageNotification, Integer> {
    List<MessageNotification> findByReceiverOrderByTimestampDesc(User receiver);
    List<MessageNotification> findBySenderOrderByTimestampDesc(User sender);
}
