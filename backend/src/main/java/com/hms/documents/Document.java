package com.hms.documents;

import com.hms.auth.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fileName;
    
    @Column(nullable = false)
    private String fileType;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;
    
    @Column(length = 1000)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uploadedBy;
    
    @ManyToOne
    @JoinColumn(name = "related_user_id")
    private User relatedToUser;
    
    @Lob
    @Column(nullable = false)
    private byte[] data;
    
    @Column(nullable = false)
    private LocalDateTime uploadDate;
    
    public enum DocumentType {
        PRESCRIPTION,
        MEDICAL_RECORD,
        LAB_REPORT,
        BILLING,
        INSURANCE,
        OTHER
    }
    
    // Default constructor
    public Document() {
        this.uploadDate = LocalDateTime.now();
    }
    
    // Constructor with fields
    public Document(String fileName, String fileType, DocumentType documentType, 
                  String description, User uploadedBy, User relatedToUser, byte[] data) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.documentType = documentType;
        this.description = description;
        this.uploadedBy = uploadedBy;
        this.relatedToUser = relatedToUser;
        this.data = data;
        this.uploadDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public String getFileType() {
        return fileType;
    }
    
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
    
    public DocumentType getDocumentType() {
        return documentType;
    }
    
    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public User getUploadedBy() {
        return uploadedBy;
    }
    
    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
    
    public User getRelatedToUser() {
        return relatedToUser;
    }
    
    public void setRelatedToUser(User relatedToUser) {
        this.relatedToUser = relatedToUser;
    }
    
    public byte[] getData() {
        return data;
    }
    
    public void setData(byte[] data) {
        this.data = data;
    }
    
    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
    
    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
}
