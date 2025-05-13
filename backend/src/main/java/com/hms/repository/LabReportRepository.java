package com.hms.repository;

import com.hms.model.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, Integer> {
}
