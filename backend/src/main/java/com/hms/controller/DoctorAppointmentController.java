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
@RequestMapping("/api/doctors/{doctorId}/appointments")
public class DoctorAppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public DoctorAppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> listByDoctor(
            @PathVariable Long doctorId,
            @RequestParam(required = false, defaultValue = "all") String filter) {
        List<AppointmentResponse> list = appointmentService.getAppointmentsByDoctor(doctorId, filter);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{apptId}")
    public ResponseEntity<AppointmentResponse> getByDoctor(
            @PathVariable Long doctorId,
            @PathVariable Long apptId) {
        AppointmentResponse resp = appointmentService.getAppointmentByDoctor(doctorId, apptId);
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> createForDoctor(
            @PathVariable Long doctorId,
            @RequestBody AppointmentRequest request) {
        AppointmentResponse created = appointmentService.createAppointmentForDoctor(doctorId, request);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{apptId}")
    public ResponseEntity<AppointmentResponse> updateForDoctor(
            @PathVariable Long doctorId,
            @PathVariable Long apptId,
            @RequestBody AppointmentRequest request) {
        AppointmentResponse updated = appointmentService.updateAppointmentForDoctor(doctorId, apptId, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{apptId}")
    public ResponseEntity<Void> deleteForDoctor(
            @PathVariable Long doctorId,
            @PathVariable Long apptId) {
        appointmentService.deleteAppointmentForDoctor(doctorId, apptId);
        return ResponseEntity.noContent().build();
    }
}
