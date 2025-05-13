package com.hms.controller;

import com.hms.dto.AppointmentDto;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.model.User;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.UserRepository;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService apptService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    /** 1) Create a new appointment: patient books with a doctor */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDto create(
            Principal principal,
            @RequestBody CreateAppointmentRequest req
    ) {
        System.out.println("the name");
        System.out.println(principal.getName());
        System.out.println("the name end");
        User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return apptService.createAppointment(patient, req);
    }

    /** 2) Patient’s view: list all doctors you have appointments with */
    @GetMapping("/my-doctors")
    public List<Doctor> myDoctors(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return apptService.findDoctorsForPatient(patient.getPatientId());
    }

    /** 3) Doctor’s view: list all patients you have appointments with */
    @GetMapping("/my-patients")
    public List<Patient> myPatients(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Doctor doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return apptService.findPatientsForDoctor(doctor.getDoctorId());
    }
}
