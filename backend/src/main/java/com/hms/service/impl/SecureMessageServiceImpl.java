// src/main/java/com/hms/service/impl/SecureMessageServiceImpl.java
package com.hms.service.impl;

import com.hms.dto.ConversationDto;
import com.hms.dto.MessageDto;
import com.hms.model.Doctor;
import com.hms.model.MessageNotification;
import com.hms.model.Patient;
import com.hms.model.User;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.MessageNotificationRepository;
import com.hms.service.SecureMessageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
@Transactional
public class SecureMessageServiceImpl implements SecureMessageService {

    @Autowired private MessageNotificationRepository msgRepo;
    @Autowired private AppointmentRepository apptRepo;

    @Override
    public MessageNotification sendMessage(User sender, User receiver,
                                           String type, String content,
                                           Long prescriptionId, Long labReportId) {
        MessageNotification m = new MessageNotification(
                sender, receiver,
                /*conversationId*/ null,
                type, content, false,
                false, prescriptionId, labReportId
        );
        return msgRepo.save(m);
    }

    @Override
    public List<MessageNotification> getInbox(User receiver) {
        return msgRepo.findByReceiverOrderByTimestampDesc(receiver);
    }

    @Override
    public List<MessageNotification> getSent(User sender) {
        return msgRepo.findBySenderOrderByTimestampDesc(sender);
    }

    @Override
    public void markAsRead(Long messageId, User user) {
        MessageNotification m = msgRepo.findById(messageId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Message not found"));
        if (!m.getReceiver().equals(user)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Not your message");
        }
        m.setIsRead(true);
        msgRepo.save(m);
    }

    @Override
    public List<ConversationDto> listConversations(User me) {
        // find all partners via appointments
        if(!me.getRole().equals("DOCTOR")){
            List<Doctor> partners= apptRepo.findDistinctDoctorsByPatientId(me.getId());
            return partners.stream()
                    .map(u -> new ConversationDto(
                            u.getDoctorId(),
                            u.getUser().getUsername(),
                            msgRepo.countUnread(u.getDoctorId(), me.getId())
                    ))
                    .toList();
        }
        else{
            List<Patient> partners= apptRepo.findDistinctPatientsByDoctorId(me.getId());
            return partners.stream()
                    .map(u -> new ConversationDto(
                            u.getPatientId(),
                            u.getUser().getUsername(),
                            msgRepo.countUnread(u.getPatientId(), me.getId())
                    ))
                    .toList();
        }
    }

    @Override
    public List<MessageDto> fetchAndMarkRead(User me, Long partnerId) {
        // mark unread as read, then return history
        List<MessageNotification> all =
                msgRepo.findConversation(me.getId(), partnerId);

        all.stream()
                .filter(m -> !m.getIsRead()
                        && m.getReceiver().equals(me))
                .forEach(m -> {
                    m.setIsRead(true);
                    msgRepo.save(m);
                });

        return all.stream()
                .map(m -> new MessageDto(
                        m.getMessageId(),
                        m.getSender().getId(),
                        m.getSender().getUsername(),
                        m.getContent(),
                        m.getTimestamp()
                ))
                .toList();
    }
}
