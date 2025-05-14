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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentControllerTest {

    @InjectMocks
    private AppointmentController controller;

    @Mock
    private AppointmentService apptService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private Principal principal;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    //
    // 1) create(...)
    //

    @Test
    void create_success() {
        // given
        when(principal.getName()).thenReturn("alice");
        User user = new User();
        user.setId(42L);
        user.setUsername("alice");
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));

        Patient patient = new Patient();
        User user1 = new User("test", "mail@mail.com", "pass", User.Role.PATIENT);
        user1.setId(99L);
        patient.setUser(user1);
        when(patientRepository.findByUserId(42L)).thenReturn(Optional.of(patient));

        CreateAppointmentRequest req = new CreateAppointmentRequest();
        // ... set any fields on req if needed

        // build a DTO using its constructor directly
        LocalDateTime date = LocalDateTime.of(2025, 5, 14, 10, 30);
        AppointmentDto dto = new AppointmentDto(
                123L,                   // id
                99L,                    // patientId
                77L,                    // doctorId
                date,                   // appointmentDate
                "SCHEDULED",            // status
                "routine checkup"       // reasonForVisit
        );

        when(apptService.createAppointment(patient, req)).thenReturn(dto);

        // when
        AppointmentDto result = controller.create(principal, req);

        // then
        assertSame(dto, result);

        verify(userRepository).findByUsername("alice");
        verify(patientRepository).findByUserId(42L);
        verify(apptService).createAppointment(patient, req);
    }

    @Test
    void create_noUser_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("ghost");
        when(userRepository.findByUsername("ghost")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.create(principal, new CreateAppointmentRequest()));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void create_noPatient_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("bob");
        User user = new User();
        user.setId(7L);
        user.setUsername("bob");
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(user));
        when(patientRepository.findByUserId(7L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.create(principal, new CreateAppointmentRequest()));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 2) myDoctors(...)
    //

    @Test
    void myDoctors_success() {
        when(principal.getName()).thenReturn("carol");
        User user = new User();
        user.setId(5L);
        user.setUsername("carol");
        when(userRepository.findByUsername("carol")).thenReturn(Optional.of(user));

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setPatientId(55L);
        when(patientRepository.findByUserId(5L)).thenReturn(Optional.of(patient));

        Doctor doc = new Doctor();
        doc.setDoctorId(77L);
        List<Doctor> doctors = Collections.singletonList(doc);
        when(apptService.findDoctorsForPatient(55L)).thenReturn(doctors);

        List<Doctor> result = controller.myDoctors(principal);

        assertEquals(doctors, result);
        verify(userRepository).findByUsername("carol");
        verify(patientRepository).findByUserId(5L);
        verify(apptService).findDoctorsForPatient(55L);
    }

    @Test
    void myDoctors_noUser_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("noone");
        when(userRepository.findByUsername("noone")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.myDoctors(principal));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void myDoctors_noPatient_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("dan");
        User user = new User();
        user.setId(9L);
        user.setUsername("dan");
        when(userRepository.findByUsername("dan")).thenReturn(Optional.of(user));
        when(patientRepository.findByUserId(9L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.myDoctors(principal));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    //
    // 3) myPatients(...)
    //

    @Test
    void myPatients_success() {
        when(principal.getName()).thenReturn("drsmith");
        User user = new User();
        user.setId(3L);
        user.setUsername("drsmith");
        when(userRepository.findByUsername("drsmith")).thenReturn(Optional.of(user));

        Doctor doctor = new Doctor();
        doctor.setDoctorId(88L);
        when(doctorRepository.findByUserId(3L)).thenReturn(Optional.of(doctor));

        Patient patient = new Patient();
        User user1 = new User("test", "mail@mail.com", "pass", User.Role.PATIENT);
        user1.setId(44L);
        patient.setUser(user1);
        List<Patient> patients = Collections.singletonList(patient);
        when(apptService.findPatientsForDoctor(88L)).thenReturn(patients);

        List<Patient> result = controller.myPatients(principal);

        assertEquals(patients, result);
        verify(userRepository).findByUsername("drsmith");
        verify(doctorRepository).findByUserId(3L);
        verify(apptService).findPatientsForDoctor(88L);
    }

    @Test
    void myPatients_noUser_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("unknown");
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.myPatients(principal));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void myPatients_noDoctor_thenThrowsUnauthorized() {
        when(principal.getName()).thenReturn("drjones");
        User user = new User();
        user.setId(11L);
        user.setUsername("drjones");
        when(userRepository.findByUsername("drjones")).thenReturn(Optional.of(user));
        when(doctorRepository.findByUserId(11L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.myPatients(principal));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }
}
