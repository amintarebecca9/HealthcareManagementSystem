package com.hms.repository;

import com.hms.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUserId(Long userId);
    @Query("SELECT COUNT(DISTINCT p.id) FROM Patient p JOIN p.appointments a WHERE a.doctor.id = :doctorId")
    int countDistinctByDoctorId(Long doctorId);
}
