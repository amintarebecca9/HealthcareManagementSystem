package com.hms.dto;

import com.hms.model.Appointment;
import java.time.LocalDate;

public class AppointmentResponse {
    private Long id;
    private Long doctorId;
    private Long patientId;
    private LocalDate date;
    private String reason;

    public static AppointmentResponse fromEntity(Appointment appointment) {
        AppointmentResponse resp = new AppointmentResponse();
        resp.id = appointment.getAppointmentId();
        resp.doctorId = appointment.getDoctor().getDoctorId();
        resp.patientId = appointment.getPatient().getPatientId();
        resp.date = LocalDate.from(appointment.getAppointmentDate());
        resp.reason = appointment.getReasonForVisit();
        return resp;
    }

    public Long getId() {
        return id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getReason() {
        return reason;
    }
}

