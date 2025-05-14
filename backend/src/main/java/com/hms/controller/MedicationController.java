package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hms.dto.MedicationDto;
import com.hms.service.MedicationService;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    @Autowired
    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping("/common")
    public ResponseEntity<List<MedicationDto>> getCommonMedications() {
        List<MedicationDto> list = medicationService.getCommonMedications();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/templates")
    public ResponseEntity<List<MedicationDto>> getMedicationTemplates() {
        List<MedicationDto> list = medicationService.getMedicationTemplates();
        return ResponseEntity.ok(list);
    }
}