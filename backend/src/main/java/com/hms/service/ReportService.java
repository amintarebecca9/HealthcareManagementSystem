package com.hms.service;

import com.hms.dto.ReportDto;
import java.util.List;

public interface ReportService {
    List<ReportDto> getAllReports();
    int countByDoctorAndStatus(Long doctorId, String status);
}