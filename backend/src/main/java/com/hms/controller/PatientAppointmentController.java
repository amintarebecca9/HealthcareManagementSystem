package com.hms.controller;

import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.dto.AppointmentRequest;
import com.hms.dto.AppointmentResponse;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/appointments")
public class PatientAppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public PatientAppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> listByPatient(
            @PathVariable Long patientId,
            @RequestParam(required = false, defaultValue = "all") String filter) {
        List<AppointmentResponse> list = appointmentService.getAppointmentsByPatient(patientId, filter);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{apptId}")
    public ResponseEntity<AppointmentResponse> getByPatient(
            @PathVariable Long patientId,
            @PathVariable Long apptId) {
        AppointmentResponse resp = appointmentService.getAppointmentByPatient(patientId, apptId);
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> createForPatient(
            @PathVariable Long patientId,
            @RequestBody AppointmentRequest request) {
        AppointmentResponse created = appointmentService.createAppointmentForPatient(patientId, request);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{apptId}")
    public ResponseEntity<AppointmentResponse> updateForPatient(
            @PathVariable Long patientId,
            @PathVariable Long apptId,
            @RequestBody AppointmentRequest request) {
        AppointmentResponse updated = appointmentService.updateAppointmentForPatient(patientId, apptId, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{apptId}")
    public ResponseEntity<Void> deleteForPatient(
            @PathVariable Long patientId,
            @PathVariable Long apptId) {
        appointmentService.deleteAppointmentForPatient(patientId, apptId);
        return ResponseEntity.noContent().build();
    }
}

