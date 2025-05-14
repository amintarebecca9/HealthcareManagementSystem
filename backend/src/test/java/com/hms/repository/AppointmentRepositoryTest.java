package com.hms.repository;

import com.hms.core.HealthcareManagementSystemApplication;
import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ContextConfiguration(classes = HealthcareManagementSystemApplication.class)
public class AppointmentRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Test
    void testFindDistinctPatientsByDoctorId() {
        // persist one doctor
        User user = new User();
        user.setUsername("doc1");
        user.setPassword("password");
        user.setEmail("mail@mail.com");
        user.setRole(User.Role.DOCTOR);
        Doctor doc = new Doctor();
        doc.setUser(user);
        entityManager.persist(doc);

        // persist two patients
        User user1 = new User();
        user1.setUsername("p1");
        user1.setPassword("password");
        user1.setEmail("mail@mail.com");
        user1.setRole(User.Role.PATIENT);
        Patient p1 = new Patient();
        p1.setUser(user1);
        entityManager.persist(p1);

        User user2 = new User();
        user2.setUsername("p2");
        user2.setPassword("password");
        user2.setEmail("mail@mail.com");
        user2.setRole(User.Role.PATIENT);
        Patient p2 = new Patient();
        p2.setUser(user2);
        entityManager.persist(p2);

        // persist three appointments: two for p1, one for p2
        LocalDateTime now = LocalDateTime.now();
        entityManager.persist(new Appointment(p1, doc, now, "SCHEDULED", "A1"));
        entityManager.persist(new Appointment(p1, doc, now.plusDays(1), "SCHEDULED", "A2"));
        entityManager.persist(new Appointment(p2, doc, now.plusDays(2), "SCHEDULED", "A3"));
        entityManager.flush();

        List<Patient> results =
                appointmentRepository.findDistinctPatientsByDoctorId(doc.getDoctorId());

        List<Long> ids = results.stream()
                .map(Patient::getPatientId)
                .collect(Collectors.toList());

        assertEquals(2, results.size(), "Expected two distinct patients");
        assertTrue(ids.contains(p1.getPatientId()));
        assertTrue(ids.contains(p2.getPatientId()));
    }

    @Test
    void testFindDistinctDoctorsByPatientId() {
        // persist one patient
        User user1 = new User();
        user1.setUsername("p1");
        user1.setPassword("password");
        user1.setEmail("mail@mail.com");
        user1.setRole(User.Role.PATIENT);
        Patient p = new Patient();
        p.setUser(user1);
        entityManager.persist(p);

        // persist two doctors
        User user2 = new User();
        user2.setUsername("d1");
        user2.setPassword("password");
        user2.setEmail("mail@mail.com");
        user2.setRole(User.Role.DOCTOR);
        Doctor d1 = new Doctor();
        d1.setUser(user2);
        entityManager.persist(d1);

        User user3 = new User();
        user3.setUsername("d2");
        user3.setPassword("password");
        user3.setEmail("mail@mail.com");
        user3.setRole(User.Role.PATIENT);
        Doctor d2 = new Doctor();
        d2.setUser(user3);
        entityManager.persist(d2);

        // persist three appointments: two with d1, one with d2
        LocalDateTime now = LocalDateTime.now();
        entityManager.persist(new Appointment(p, d1, now, "SCHEDULED", "B1"));
        entityManager.persist(new Appointment(p, d1, now.plusDays(1), "SCHEDULED", "B2"));
        entityManager.persist(new Appointment(p, d2, now.plusDays(2), "SCHEDULED", "B3"));
        entityManager.flush();

        List<Doctor> results =
                appointmentRepository.findDistinctDoctorsByPatientId(p.getPatientId());

        List<Long> ids = results.stream()
                .map(Doctor::getDoctorId)
                .collect(Collectors.toList());

        assertEquals(2, results.size(), "Expected two distinct doctors");
        assertTrue(ids.contains(d1.getDoctorId()));
        assertTrue(ids.contains(d2.getDoctorId()));
    }
}
