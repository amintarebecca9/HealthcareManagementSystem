package com.hms.repository;

import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT DISTINCT p FROM Appointment ap JOIN ap.patient p WHERE ap.doctor.id = :docId")
    List<Patient> findDistinctPatientsByDoctorId(@Param("docId") Long docId);

    @Query("SELECT DISTINCT d FROM Appointment ap JOIN ap.doctor d WHERE ap.patient.id = :patId")
    List<Doctor> findDistinctDoctorsByPatientId(@Param("patId") Long patId);

    int countByDoctorIdAndDate(Long doctorId, LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.date = :date")
    List<Appointment> findByDoctorIdAndDate(
            @Param("doctorId") Long doctorId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.date > :date")
    List<Appointment> findByDoctorIdAndDateAfter(
            @Param("doctorId") Long doctorId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.date < :date")
    List<Appointment> findByDoctorIdAndDateBefore(
            @Param("doctorId") Long doctorId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId")
    List<Appointment> findByDoctorId(
            @Param("doctorId") Long doctorId
    );

    // Patient-scoped queries
    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.date = :date")
    List<Appointment> findByPatientIdAndDate(
            @Param("patientId") Long patientId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.date > :date")
    List<Appointment> findByPatientIdAndDateAfter(
            @Param("patientId") Long patientId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.date < :date")
    List<Appointment> findByPatientIdAndDateBefore(
            @Param("patientId") Long patientId,
            @Param("date") LocalDate date
    );

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId")
    List<Appointment> findByPatientId(
            @Param("patientId") Long patientId
    );

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.id = :id")
    java.util.Optional<Appointment> findByDoctorIdAndId(
            @Param("doctorId") Long doctorId,
            @Param("id") Long id
    );

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.id = :id")
    java.util.Optional<Appointment> findByPatientIdAndId(
            @Param("patientId") Long patientId,
            @Param("id") Long id
    );

    void deleteByDoctorIdAndId(Long doctorId, Long id);
    void deleteByPatientIdAndId(Long patientId, Long id);
    List<Appointment> findByAppointmentDateBetween(LocalDateTime start, LocalDateTime end);
}


