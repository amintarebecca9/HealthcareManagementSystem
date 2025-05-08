package com.hms.controller;

import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.model.User;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AppointmentRepository appointmentRepo;

    @GetMapping("/my-patients")
    public List<Patient> myPatients(Authentication authentication) {
        String username = authentication.getName();
        User me = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Return only patients that this doctor has seen
        return appointmentRepo.findDistinctPatientsByDoctorId(me.getId());
    }

    @GetMapping("/my-doctors")
    public List<Doctor> myDoctors(Authentication authentication) {
        String username = authentication.getName();
        User me = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Return only doctors that this patient has appointments with
        return appointmentRepo.findDistinctDoctorsByPatientId(me.getId());
    }
}
