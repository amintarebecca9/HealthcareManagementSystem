package com.hms.service.impl;

import com.hms.model.LabReport;
import com.hms.model.MessageNotification;
import com.hms.model.Prescription;
import com.hms.model.User;
import com.hms.repository.MessageNotificationRepository;
import com.hms.repository.PrescriptionRepository;
import com.hms.repository.LabReportRepository;
import com.hms.service.EncryptionService;
import com.hms.service.SecureMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class SecureMessageServiceImpl implements SecureMessageService {

    @Autowired
    private MessageNotificationRepository msgRepo;
    @Autowired private PrescriptionRepository rxRepo;
    @Autowired private LabReportRepository reportRepo;
    @Autowired private EncryptionService crypto;

    @Override
    @Transactional
    public MessageNotification sendMessage(User sender,
                                           User receiver,
                                           String type,
                                           String content,
                                           Integer prescriptionId,
                                           Integer labReportId) {
        String encrypted = crypto.encrypt(content);
        MessageNotification msg = new MessageNotification();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setTimestamp(LocalDateTime.now());
        msg.setType(type);
        msg.setContent(encrypted);
        msg.setIsEncrypted(true);
        msg.setIsRead(false);

        if (prescriptionId != null) {
            Prescription rx = rxRepo.findById(prescriptionId)
                    .orElseThrow(() -> new RuntimeException("Prescription not found"));
            msg.setPrescription(rx);
        }
        if (labReportId != null) {
            LabReport lr = reportRepo.findById(labReportId)
                    .orElseThrow(() -> new RuntimeException("Lab report not found"));
            msg.setLabReport(lr);
        }

        return msgRepo.save(msg);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageNotification> getInbox(User receiver) {
        List<MessageNotification> msgs = msgRepo.findByReceiverOrderByTimestampDesc(receiver);
        msgs.forEach(m -> {
            if (Boolean.TRUE.equals(m.getIsEncrypted())) {
                String decrypted = crypto.decrypt(m.getContent());
                m.setContent(decrypted);
                m.setIsEncrypted(false);
            }
        });
        return msgs;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageNotification> getSent(User sender) {
        List<MessageNotification> msgs = msgRepo.findBySenderOrderByTimestampDesc(sender);
        msgs.forEach(m -> {
            if (Boolean.TRUE.equals(m.getIsEncrypted())) {
                m.setContent(crypto.decrypt(m.getContent()));
            }
        });
        return msgs;
    }

    @Override
    @Transactional
    public void markAsRead(Integer messageId, User user) {
        MessageNotification msg = msgRepo.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        if (!msg.getReceiver().equals(user)) {
            throw new RuntimeException("Unauthorized");
        }
        msg.setIsRead(true);
        msgRepo.save(msg);
    }
}
