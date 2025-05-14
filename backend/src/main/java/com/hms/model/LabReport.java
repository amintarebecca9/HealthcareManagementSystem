package com.hms.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "lab_report")
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer reportId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @Column(length = 100)
    private String reportType;

    @Column
    private LocalDate reportDate;

    @Column(columnDefinition = "TEXT")
    private String fileUrl;

    // Default constructor
    public LabReport() {}

    // Constructor with fields
    public LabReport(Patient patient, User uploadedBy, String reportType, LocalDate reportDate, String fileUrl) {
        this.patient = patient;
        this.uploadedBy = uploadedBy;
        this.reportType = reportType;
        this.reportDate = reportDate;
        this.fileUrl = fileUrl;
    }

    // Getters and Setters
    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}

