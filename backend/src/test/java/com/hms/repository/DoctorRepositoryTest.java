package com.hms.repository;

import com.hms.core.HealthcareManagementSystemApplication;
import com.hms.model.Doctor;
import com.hms.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ContextConfiguration(classes = HealthcareManagementSystemApplication.class)
class DoctorRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private DoctorRepository doctorRepository;

    @Test
    void testFindByUserId_found() {
        // first, persist a User
        User user = new User();
        user.setUsername("docuser");
        user.setEmail("doc@example.com");
        user.setPassword("pw");
        user.setRole(User.Role.DOCTOR);
        entityManager.persist(user);
        entityManager.flush();

        // then, persist a Doctor linked to that User
        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization("Cardiology");
        doctor.setLicenseNumber("LIC-2025");
        doctor.setHospitalAffiliation("General Hospital");
        entityManager.persist(doctor);
        entityManager.flush();

        // exercise
        Optional<Doctor> found = doctorRepository.findByUserId(user.getId());

        // verify
        assertTrue(found.isPresent(), "Doctor should be found by userId");
        assertEquals(doctor.getDoctorId(), found.get().getDoctorId());
        assertEquals("Cardiology", found.get().getSpecialization());
    }

    @Test
    void testFindByUserId_notFound() {
        // no doctor persisted for this userId
        Optional<Doctor> found = doctorRepository.findByUserId(999L);
        assertTrue(found.isEmpty(), "Should return empty when no doctor exists for given userId");
    }
}
