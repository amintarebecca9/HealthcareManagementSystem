package com.hms.service;

import com.hms.model.MessageNotification;
import com.hms.model.User;
import java.util.List;

public interface SecureMessageService {
    MessageNotification sendMessage(User sender,
                                    User receiver,
                                    String type,
                                    String content,
                                    Integer prescriptionId,
                                    Integer labReportId);
    List<MessageNotification> getInbox(User receiver);
    List<MessageNotification> getSent(User sender);
    void markAsRead(Integer messageId, User user);
}

