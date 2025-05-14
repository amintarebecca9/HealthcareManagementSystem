package com.hms.repository;

import com.hms.model.MessageNotification;
import com.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageNotificationRepository
        extends JpaRepository<MessageNotification,Long> {

    @Query("""
    SELECT COUNT(m)
    FROM MessageNotification m
    WHERE m.sender.id   = :partnerId
      AND m.receiver.id = :meId
      AND m.isRead      = false
    """)
    long countUnread(@Param("partnerId") Long partnerId,
                     @Param("meId")      Long meId);

    @Query("""
    SELECT m
    FROM MessageNotification m
    WHERE (m.sender.id   = :meId AND m.receiver.id = :partnerId)
       OR (m.sender.id   = :partnerId AND m.receiver.id = :meId)
    ORDER BY m.timestamp
    """)
    List<MessageNotification> findConversation(@Param("meId") Long meId,
                                               @Param("partnerId") Long partnerId);

    List<MessageNotification> findByReceiverOrderByTimestampDesc(User receiver);
    List<MessageNotification> findBySenderOrderByTimestampDesc(User sender);
    int countByRecipientIdAndReadFalse(Long recipientId);
}
