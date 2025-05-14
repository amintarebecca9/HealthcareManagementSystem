package com.hms.service.impl;

import com.hms.dto.AppointmentDto;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentServiceImplTest {

    @InjectMocks
    private AppointmentServiceImpl service;

    @Mock
    private AppointmentRepository apptRepo;

    @Mock
    private DoctorRepository docRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createAppointment_success() {
        // given
        Patient patient = new Patient();
        patient.setPatientId(77L);

        Long doctorUserId = 88L;
        CreateAppointmentRequest req = new CreateAppointmentRequest();
        req.setDoctorId(doctorUserId);
        LocalDateTime date = LocalDateTime.of(2025,5,20,14,0);
        req.setDate(date);
        String reason = "Checkup";
        req.setReason(reason);

        Doctor doctor = new Doctor();
        doctor.setDoctorId(99L);
        when(docRepo.findByUserId(doctorUserId)).thenReturn(Optional.of(doctor));

        Appointment saved = new Appointment();
        saved.setAppointmentId(123L);
        saved.setPatient(patient);
        saved.setDoctor(doctor);
        saved.setAppointmentDate(date);
        saved.setReasonForVisit(reason);
        when(apptRepo.save(any(Appointment.class))).thenReturn(saved);

        // when
        AppointmentDto dto = service.createAppointment(patient, req);

        // then
        verify(docRepo).findByUserId(doctorUserId);
        verify(apptRepo).save(any(Appointment.class));
    }

    @Test
    void createAppointment_doctorNotFound_throws404() {
        Patient patient = new Patient();
        patient.setPatientId(1L);

        CreateAppointmentRequest req = new CreateAppointmentRequest();
        req.setDoctorId(55L);
        req.setDate(LocalDateTime.now());
        req.setReason("R");

        when(docRepo.findByUserId(55L)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> service.createAppointment(patient, req)
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertTrue(ex.getReason().contains("Doctor not found"));
    }

    @Test
    void findDoctorsForPatient_delegatesToRepo() {
        List<Doctor> list = List.of(new Doctor());
        when(apptRepo.findDistinctDoctorsByPatientId(5L)).thenReturn(list);

        List<Doctor> result = service.findDoctorsForPatient(5L);
        assertSame(list, result);
        verify(apptRepo).findDistinctDoctorsByPatientId(5L);
    }

    @Test
    void findPatientsForDoctor_delegatesToRepo() {
        List<Patient> list = List.of(new Patient());
        when(apptRepo.findDistinctPatientsByDoctorId(7L)).thenReturn(list);

        List<Patient> result = service.findPatientsForDoctor(7L);
        assertSame(list, result);
        verify(apptRepo).findDistinctPatientsByDoctorId(7L);
    }
}
