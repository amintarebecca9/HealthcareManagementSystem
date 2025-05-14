package com.hms.repository;

import com.hms.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByCommonTrue();
    List<Medication> findByTemplateTrue();
}
