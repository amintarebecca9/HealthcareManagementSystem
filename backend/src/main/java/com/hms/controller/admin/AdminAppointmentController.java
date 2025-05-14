package com.hms.controller.admin;

import com.hms.dto.AppointmentDto;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/appointments")
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AdminAppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDto>> listByDate(@RequestParam(required = false) String date) {
        LocalDate dt = (date != null) ? LocalDate.parse(date) : null;
        List<AppointmentDto> list = appointmentService.getAppointmentsByDate(dt);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{apptId}")
    public ResponseEntity<AppointmentDto> updateAppointment(
            @PathVariable Long apptId,
            @RequestBody AppointmentDto dto) {
        AppointmentDto updated = appointmentService.adminUpdateAppointment(apptId, dto);
        return ResponseEntity.ok(updated);
    }
}
