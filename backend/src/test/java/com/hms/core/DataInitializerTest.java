package com.hms.core;

import com.hms.model.*;
import com.hms.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import static org.mockito.Mockito.*;

class DataInitializerTest {

    @InjectMocks
    private DataInitializer initializer;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    // For generating unique IDs in save(...)
    private AtomicLong userIdGen;
    private AtomicLong patientIdGen;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        userIdGen = new AtomicLong(1L);
        patientIdGen = new AtomicLong(100L);

        // 1) PasswordEncoder just prefixes so we can verify use
        when(passwordEncoder.encode(anyString()))
                .thenAnswer(inv -> "enc-" + inv.getArgument(0));

        // 2) Saving a User assigns an incremental ID
        when(userRepository.save(any(User.class)))
                .thenAnswer(inv -> {
                    User u = inv.getArgument(0);
                    u.setId(userIdGen.getAndIncrement());
                    return u;
                });

        // 3) Saving a Patient assigns an incremental patientId
        when(patientRepository.save(any(Patient.class)))
                .thenAnswer(inv -> {
                    Patient p = inv.getArgument(0);
                    p.setPatientId(patientIdGen.getAndIncrement());
                    return p;
                });

        // 4) Saving an Appointment just returns it
        when(appointmentRepository.save(any(Appointment.class)))
                .thenAnswer(inv -> inv.getArgument(0));
    }

    @Test
    void run_initializesAllEntities_whenDatabaseEmpty() throws Exception {
        // --- stub user lookups all empty so createUser(...) branch runs 6 times ---
        for (String uname : List.of("doctor", "patient1", "patient2", "patient3", "staff", "admin")) {
            when(userRepository.findByUsername(uname))
                    .thenReturn(Optional.empty());
        }

        // --- doctor: first findByUserId → empty, after save → present ---
        when(doctorRepository.save(any(Doctor.class)))
                .thenAnswer(inv -> {
                    Doctor d = inv.getArgument(0);
                    d.setDoctorId(50L);
                    return d;
                });
        Doctor d = new Doctor();
        d.setDoctorId(50L);
        when(doctorRepository.findByUserId(1L))
                .thenReturn(Optional.empty(), Optional.of(d));

        // --- patients: for each patient1,2,3 userId=2,3,4 ---
        for (long uid = 2; uid <= 4; uid++) {
            when(patientRepository.save(any(Patient.class)))
                    .thenAnswer(inv -> {
                        Patient p = inv.getArgument(0);
                        p.setPatientId(patientIdGen.getAndIncrement());
                        return p;
                    });
            Patient p = new Patient();
            p.setPatientId(uid);
            when(patientRepository.findByUserId(uid))
                    .thenReturn(Optional.empty(), Optional.of(p));
        }

        // --- no appointments initially ---
        when(appointmentRepository.findAll())
                .thenReturn(Collections.emptyList());

        // execute the initializer
        initializer.run();

        // verify all branches ran
        verify(userRepository, times(6)).save(any(User.class));
        verify(doctorRepository, times(1)).save(any(Doctor.class));
        verify(patientRepository, times(3)).save(any(Patient.class));
        // one appointment per patient → 3 saves
        verify(appointmentRepository, times(3)).save(any(Appointment.class));
    }

    @Test
    void run_skipsAll_whenDataAlreadyPresent() throws Exception {
        // --- all users already exist ---
        for (String uname : List.of("doctor", "patient1", "patient2", "patient3", "staff", "admin")) {
            User user = new User();
            user.setUsername(uname);
            user.setId(userIdGen.getAndIncrement());
            when(userRepository.findByUsername(uname))
                    .thenReturn(Optional.of(user));
        }

        // --- doctor already exists ---
        Doctor d = new Doctor();
        d.setDoctorId(1L);
        when(doctorRepository.findByUserId(anyLong()))
                .thenReturn(Optional.of(d));

        // --- patients already exist ---
        for (long uid = 2; uid <= 4; uid++) {
            Patient p = new Patient();
            p.setPatientId(uid);
            when(patientRepository.findByUserId(uid)).thenReturn(Optional.of(p));
        }

        // --- existing appointment that matches the first patient/doctor/date ---
        Doctor dr = new Doctor(); dr.setDoctorId(1L);
        Patient pt = new Patient(); pt.setPatientId(2L);
        Appointment existing = mock(Appointment.class);
        when(existing.getDoctor()).thenReturn(dr);
        when(existing.getPatient()).thenReturn(pt);
        when(existing.getAppointmentDate())
                .thenReturn(LocalDateTime.now().plusDays(1));
        when(appointmentRepository.findAll())
                .thenReturn(List.of(existing));

        // run
        initializer.run();

        // no saves should be invoked
        verify(userRepository, never()).save(any());
        verify(doctorRepository, never()).save(any());
        verify(patientRepository, never()).save(any());
        verify(appointmentRepository, times(2)).save(any());
    }
}
