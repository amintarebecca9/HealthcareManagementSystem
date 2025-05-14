package com.hms.service;

import com.hms.dto.CreatePrescriptionRequest;
import com.hms.dto.PrescriptionDto;

import java.util.List;

public interface PrescriptionService {
    List<PrescriptionDto> getPrescriptionsByDoctor(Long doctorId, String filter);
    PrescriptionDto getPrescriptionById(Long doctorId, Long prescId);
    PrescriptionDto createPrescription(Long doctorId, CreatePrescriptionRequest request);
    PrescriptionDto updatePrescription(Long doctorId, Long prescId, CreatePrescriptionRequest request);
}
