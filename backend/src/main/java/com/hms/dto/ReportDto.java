package com.hms.dto;

import com.hms.model.LabReport;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReportDto {
    private Integer id;
    private Long patientId;
    private Long uploadedById;
    private String reportType;
    private LocalDate reportDate;
    private String fileUrl;

    public ReportDto() {}

    public ReportDto(Integer id,
                     Long patientId,
                     Long uploadedById,
                     String reportType,
                     LocalDate reportDate,
                     String fileUrl) {
        this.id = id;
        this.patientId = patientId;
        this.uploadedById = uploadedById;
        this.reportType = reportType;
        this.reportDate = reportDate;
        this.fileUrl = fileUrl;
    }

    public static ReportDto fromEntity(LabReport r) {
        return new ReportDto(
                r.getReportId(),
                r.getPatient().getPatientId(),
                r.getUploadedBy().getId(),
                r.getReportType(),
                r.getReportDate(),
                r.getFileUrl()
        );
    }

    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getUploadedById() { return uploadedById; }
    public void setUploadedById(Long uploadedById) { this.uploadedById = uploadedById; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public LocalDate getReportDate() { return reportDate; }
    public void setReportDate(LocalDate reportDate) { this.reportDate = reportDate; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}