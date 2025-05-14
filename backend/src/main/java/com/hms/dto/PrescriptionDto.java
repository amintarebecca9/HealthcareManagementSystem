package com.hms.dto;

import com.hms.model.Prescription;
import java.time.LocalDateTime;

public class PrescriptionDto {
    private Long id;
    private Long doctorId;
    private Long patientId;
    private String medicationName;
    private String dosage;
    private LocalDateTime prescribedAt;

    public static PrescriptionDto fromEntity(Prescription p) {
        PrescriptionDto dto = new PrescriptionDto();
        dto.id = p.getPrescriptionId();
        dto.doctorId = p.getDoctor().getDoctorId();
        dto.patientId = p.getPatient().getPatientId();
        dto.medicationName = p.getMedication().getName();
        dto.dosage = p.getDosage();
        dto.prescribedAt = LocalDateTime.now();
        return dto;
    }

    // getters
}