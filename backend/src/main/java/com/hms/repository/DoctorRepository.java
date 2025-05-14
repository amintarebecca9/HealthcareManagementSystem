package com.hms.repository;

import com.hms.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    /**
     * Lookup a Doctor by its associated User’s id.
     */
    Optional<Doctor> findByUserId(Long userId);
}

