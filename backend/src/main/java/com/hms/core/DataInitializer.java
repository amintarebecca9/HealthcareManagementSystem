package com.hms.core;

import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.model.User;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        // 1) Create Users
        User docUser = createUser("doctor", "doctor@example.com", "password", User.Role.DOCTOR);
        User patUser1 = createUser("patient1", "p1@example.com", "password", User.Role.PATIENT);
        User patUser2 = createUser("patient2", "p2@example.com", "password", User.Role.PATIENT);
        User patUser3 = createUser("patient3", "p3@example.com", "password", User.Role.PATIENT);
        createUser("staff", "staff@example.com", "password", User.Role.STAFF);
        createUser("admin", "admin@example.com", "password", User.Role.ADMIN);

        // 2) Create Doctor entity (if not present)
        Optional<Doctor> doctor = doctorRepository.findByUserId(docUser.getId());
        if (doctor.isEmpty()) {
            Doctor d = new Doctor();
            d.setUser(docUser);
            d.setSpecialization("General Practice");
            d.setLicenseNumber("LIC-12345");
            d.setHospitalAffiliation("City Hospital");
            doctorRepository.save(d);
        }

        // 3) Create Patient entities (if not present)
        List<User> patientUsers = List.of(patUser1, patUser2, patUser3);
        for (User u : patientUsers) {
            patientRepository.findByUserId(u.getId())
                    .orElseGet(() -> {
                        Patient p = new Patient();
                        p.setUser(u);
                        p.setDateOfBirth(LocalDate.of(1990, 1, 1));
                        p.setGender("Unknown");
                        p.setAddress("123 Main St");
                        p.setInsuranceProvider("Acme Ins.");
                        p.setEmergencyContact("Jane Doe");
                        return patientRepository.save(p);
                    });
        }

        // 4) Seed one appointment per patient with that doctor
        Doctor dr = doctorRepository.findByUserId(docUser.getId()).get();
        for (int i = 0; i < patientUsers.size(); i++) {
            Patient pt = patientRepository.findByUserId(patientUsers.get(i).getId()).get();
            LocalDateTime dt = LocalDateTime.now().plusDays(i + 1);
            boolean exists = appointmentRepository
                    .findAll()
                    .stream()
                    .anyMatch(a ->
                            a.getDoctor().getDoctorId().equals(dr.getDoctorId()) &&
                                    a.getPatient().getPatientId().equals(pt.getPatientId()) &&
                                    a.getAppointmentDate().toLocalDate().equals(dt.toLocalDate())
                    );
            if (!exists) {
                Appointment appt = new Appointment(pt, dr, dt, "SCHEDULED", "Initial consultation");
                appointmentRepository.save(appt);
            }
        }

        System.out.println("Data initialization complete.");
    }

    private User createUser(String username, String email, String rawPassword, User.Role role) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseGet(() -> {
                    User u = new User(username, email, passwordEncoder.encode(rawPassword), role, true);
                    return userRepository.save(u);
                });
    }
}