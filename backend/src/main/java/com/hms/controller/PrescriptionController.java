package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.dto.CreatePrescriptionRequest;
import com.hms.dto.PrescriptionDto;
import com.hms.service.PrescriptionService;
import java.util.List;

@RestController
@RequestMapping("/api/doctors/{doctorId}/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Autowired
    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @GetMapping
    public ResponseEntity<List<PrescriptionDto>> listPrescriptions(
            @PathVariable Long doctorId,
            @RequestParam(required = false, defaultValue = "all") String filter) {
        List<PrescriptionDto> list = prescriptionService.getPrescriptionsByDoctor(doctorId, filter);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{prescId}")
    public ResponseEntity<PrescriptionDto> getPrescription(
            @PathVariable Long doctorId,
            @PathVariable Long prescId) {
        PrescriptionDto dto = prescriptionService.getPrescriptionById(doctorId, prescId);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<PrescriptionDto> createPrescription(
            @PathVariable Long doctorId,
            @RequestBody CreatePrescriptionRequest request) {
        PrescriptionDto created = prescriptionService.createPrescription(doctorId, request);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{prescId}")
    public ResponseEntity<PrescriptionDto> updatePrescription(
            @PathVariable Long doctorId,
            @PathVariable Long prescId,
            @RequestBody CreatePrescriptionRequest request) {
        PrescriptionDto updated = prescriptionService.updatePrescription(doctorId, prescId, request);
        return ResponseEntity.ok(updated);
    }
}
