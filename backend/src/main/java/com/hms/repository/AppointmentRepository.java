package com.hms.repository;

import com.hms.model.Appointment;
import com.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT DISTINCT p FROM Appointment ap JOIN ap.patient p WHERE ap.doctor.id = :docId")
    List<User> findDistinctPatientsByDoctorId(@Param("docId") Long docId);

    @Query("SELECT DISTINCT d FROM Appointment ap JOIN ap.doctor d WHERE ap.patient.id = :patId")
    List<User> findDistinctDoctorsByPatientId(@Param("patId") Long patId);
}


