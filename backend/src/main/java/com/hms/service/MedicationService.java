package com.hms.service;

import com.hms.dto.MedicationDto;

import java.util.List;

public interface MedicationService {
    List<MedicationDto> getCommonMedications();
    List<MedicationDto> getMedicationTemplates();
}