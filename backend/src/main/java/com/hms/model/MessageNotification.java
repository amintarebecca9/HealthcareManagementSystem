package com.example.healthcare.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message_notification")
public class MessageNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Integer messageId;

    // sender_id -> references user(user_id)
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    // receiver_id -> references user(user_id)
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(name = "timestamp",
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "is_encrypted", nullable = false)
    private Boolean isEncrypted = Boolean.TRUE;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = Boolean.FALSE;

    @ManyToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private LabReport labReport;

    public MessageNotification() {
    }

    public MessageNotification(User sender,
                               User receiver,
                               LocalDateTime timestamp,
                               String type,
                               String content,
                               Boolean isEncrypted,
                               Boolean isRead,
                               Prescription prescription,
                               LabReport labReport) {
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

    public Integer getMessageId() {
        return messageId;
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

    // You could omit the setter to rely on DB default or set it explicitly
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

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public LabReport getLabReport() {
        return labReport;
    }

    public void setLabReport(LabReport labReport) {
        this.labReport = labReport;
    }
}
