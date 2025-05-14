// src/main/java/com/hms/service/SecureMessageService.java
package com.hms.service;

import com.hms.dto.ConversationDto;
import com.hms.dto.MessageDto;
import com.hms.model.MessageNotification;
import com.hms.model.User;

import java.util.List;

public interface SecureMessageService {
    // existing
    MessageNotification sendMessage(User sender,
                                    User receiver,
                                    String type,
                                    String content,
                                    Long prescriptionId,
                                    Long labReportId);

    List<MessageNotification> getInbox(User receiver);
    List<MessageNotification> getSent(User sender);
    void markAsRead(Long messageId, User user);

    // newly added
    List<ConversationDto> listConversations(User me);
    List<MessageDto> fetchAndMarkRead(User me, Long partnerId);
    List<MessageNotification> getAllMessages();
}
