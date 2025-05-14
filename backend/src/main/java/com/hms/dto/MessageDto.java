package com.hms.dto;
import com.hms.model.MessageNotification;

import java.time.LocalDateTime;

public class MessageDto {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String type;
    private String content;
    private Long prescriptionId;
    private Long labReportId;
    private LocalDateTime timestamp;
    private boolean read;

    public MessageDto(Long id,
                      Long senderId,
                      Long receiverId,
                      String type,
                      String content,
                      Long prescriptionId,
                      Long labReportId,
                      LocalDateTime timestamp,
                      boolean read) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.type = type;
        this.content = content;
        this.prescriptionId = prescriptionId;
        this.labReportId = labReportId;
        this.timestamp = timestamp;
        this.read = read;
    }

    public static MessageDto fromEntity(MessageNotification m) {
        return new MessageDto(
                m.getMessageId(),
                m.getSender().getId(),
                m.getReceiver().getId(),
                m.getType(),
                m.getContent(),
                m.getPrescription() != null ? m.getPrescription() : null,
                m.getLabReport() != null ? m.getLabReport() : null,
                m.getTimestamp(),
                m.getIsRead()
        );
    }

    // Getters
    public Long getId() { return id; }
    public Long getSenderId() { return senderId; }
    public Long getReceiverId() { return receiverId; }
    public String getType() { return type; }
    public String getContent() { return content; }
    public Long getPrescriptionId() { return prescriptionId; }
    public Long getLabReportId() { return labReportId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public boolean isRead() { return read; }
}