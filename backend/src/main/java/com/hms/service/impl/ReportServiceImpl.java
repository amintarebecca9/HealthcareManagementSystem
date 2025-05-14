package com.hms.service.impl;

import com.hms.dto.ReportDto;
import com.hms.model.LabReport;
import com.hms.repository.LabReportRepository;
import com.hms.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    private final LabReportRepository reportRepo;

    @Autowired
    public ReportServiceImpl(LabReportRepository reportRepo) {
        this.reportRepo = reportRepo;
    }

    @Override
    public List<ReportDto> getAllReports() {
        List<LabReport> list = reportRepo.findAll();
        return list.stream()
                .map(ReportDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public int countByDoctorAndStatus(Long doctorId, String status) {
        return reportRepo.countByDoctorIdAndStatus(doctorId, status);
    }
}