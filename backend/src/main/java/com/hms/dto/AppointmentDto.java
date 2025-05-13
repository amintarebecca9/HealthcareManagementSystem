package com.hms.dto;

import java.time.LocalDateTime;

public class AppointmentDto {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime date;
    private String reason;

    public AppointmentDto(Long id, Long patientId, Long doctorId, LocalDateTime date, String reason) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.reason = reason;
    }
    // constructor, getters
}

