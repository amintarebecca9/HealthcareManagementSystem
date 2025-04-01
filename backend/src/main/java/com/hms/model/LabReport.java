package com.example.healthcare.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lab_report")
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id", nullable = false)
    private Integer reportId;

    // patient_id -> references patient(patient_id)
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // uploaded_by -> references user(user_id)
    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @Column(name = "report_type", length = 100)
    private String reportType;

    @Column(name = "report_date")
    private LocalDate reportDate;

    @Column(name = "file_url", columnDefinition = "TEXT")
    private String fileUrl;

    public LabReport() {
    }

    public LabReport(Patient patient, User uploadedBy, String reportType, LocalDate reportDate, String fileUrl) {
        this.patient = patient;
        this.uploadedBy = uploadedBy;
        this.reportType = reportType;
        this.reportDate = reportDate;
        this.fileUrl = fileUrl;
    }

    public Integer getReportId() {
        return reportId;
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
