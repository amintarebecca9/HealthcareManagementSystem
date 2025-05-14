package com.hms.service.impl;

import com.hms.dto.MedicationDto;
import com.hms.model.Medication;
import com.hms.repository.MedicationRepository;
import com.hms.service.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicationServiceImpl implements MedicationService {

    private final MedicationRepository medicationRepo;

    @Autowired
    public MedicationServiceImpl(MedicationRepository medicationRepo) {
        this.medicationRepo = medicationRepo;
    }

    @Override
    public List<MedicationDto> getCommonMedications() {
        List<Medication> meds = medicationRepo.findByCommonTrue();
        return meds.stream()
                .map(MedicationDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicationDto> getMedicationTemplates() {
        List<Medication> templates = medicationRepo.findByTemplateTrue();
        return templates.stream()
                .map(MedicationDto::fromEntity)
                .collect(Collectors.toList());
    }
}