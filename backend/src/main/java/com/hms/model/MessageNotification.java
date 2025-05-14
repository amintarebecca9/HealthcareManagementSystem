package com.hms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message_notification")
public class MessageNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long messageId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;

    @Column(length = 100)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Boolean isEncrypted = Boolean.TRUE;

    @Column(nullable = false)
    private Boolean isRead = Boolean.FALSE;

    @JoinColumn(name = "prescription_id")
    private Long prescription;

    @JoinColumn(name = "report_id")
    private Long labReport;

    // Default constructor
    public MessageNotification() {}

    // Constructor with fields
    public MessageNotification(User sender,
                               User receiver,
                               LocalDateTime timestamp,
                               String type,
                               String content,
                               Boolean isEncrypted,
                               Boolean isRead,
                               Long prescription,
                               Long labReport) {
        this.sender = sender;
        this.receiver = receiver;
        this.timestamp = timestamp;
        this.type = type;
        this.content = content;
        this.isEncrypted = isEncrypted;
        this.isRead = isRead;
        this.prescription = prescription;
        this.labReport = labReport;
    }

    // Getters and Setters
    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsEncrypted() {
        return isEncrypted;
    }

    public void setIsEncrypted(Boolean isEncrypted) {
        this.isEncrypted = isEncrypted;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Long getPrescription() {
        return prescription;
    }

    public void setPrescription(Long prescription) {
        this.prescription = prescription;
    }

    public Long getLabReport() {
        return labReport;
    }

    public void setLabReport(Long labReport) {
        this.labReport = labReport;
    }
}
