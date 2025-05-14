package com.hms.controller;

import com.hms.model.User;
import com.hms.model.Patient;
import com.hms.model.Doctor;
import com.hms.repository.UserRepository;
import com.hms.repository.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @InjectMocks
    private UserController controller;

    @Mock
    private UserRepository userRepo;

    @Mock
    private AppointmentRepository appointmentRepo;

    @Mock
    private Authentication auth;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // myPatients(...) happy path
    @Test
    void myPatients_success() {
        when(auth.getName()).thenReturn("drsmith");
        User me = new User();
        me.setId(5L);
        me.setUsername("drsmith");
        when(userRepo.findByUsername("drsmith")).thenReturn(Optional.of(me));

        Patient p1 = new Patient();
        p1.setPatientId(10L);
        List<Patient> expected = List.of(p1);
        when(appointmentRepo.findDistinctPatientsByDoctorId(5L)).thenReturn(expected);

        List<Patient> result = controller.myPatients(auth);
        assertEquals(expected, result);
        verify(appointmentRepo).findDistinctPatientsByDoctorId(5L);
    }

    // myPatients(...) user not found
    @Test
    void myPatients_userNotFound_then404() {
        when(auth.getName()).thenReturn("drno");
        when(userRepo.findByUsername("drno")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> controller.myPatients(auth)
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    // myDoctors(...) happy path
    @Test
    void myDoctors_success() {
        when(auth.getName()).thenReturn("alice");
        User me = new User();
        me.setId(7L);
        me.setUsername("alice");
        when(userRepo.findByUsername("alice")).thenReturn(Optional.of(me));

        Doctor d1 = new Doctor();
        d1.setDoctorId(20L);
        List<Doctor> expected = List.of(d1);
        when(appointmentRepo.findDistinctDoctorsByPatientId(7L)).thenReturn(expected);

        List<Doctor> result = controller.myDoctors(auth);
        assertEquals(expected, result);
        verify(appointmentRepo).findDistinctDoctorsByPatientId(7L);
    }

    // myDoctors(...) user not found
    @Test
    void myDoctors_userNotFound_then404() {
        when(auth.getName()).thenReturn("nobody");
        when(userRepo.findByUsername("nobody")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> controller.myDoctors(auth)
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }
}
