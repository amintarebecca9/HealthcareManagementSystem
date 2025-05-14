package com.hms.dto;

import com.hms.model.Appointment;
import java.time.LocalDateTime;

public class AppointmentDto {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
    private String status;
    private String reasonForVisit;

    public AppointmentDto() {}

    public AppointmentDto(Long id,
                          Long patientId,
                          Long doctorId,
                          LocalDateTime appointmentDate,
                          String status,
                          String reasonForVisit) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.reasonForVisit = reasonForVisit;
    }

    public static AppointmentDto fromEntity(Appointment a) {
        return new AppointmentDto(
                a.getAppointmentId(),
                a.getPatient().getPatientId(),
                a.getDoctor().getDoctorId(),
                a.getAppointmentDate(),
                a.getStatus(),
                a.getReasonForVisit()
        );
    }

    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public LocalDateTime getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReasonForVisit() { return reasonForVisit; }
    public void setReasonForVisit(String reasonForVisit) { this.reasonForVisit = reasonForVisit; }
}

