package com.hms.service.impl;

import com.hms.dto.DashboardResponse;
import com.hms.repository.LabReportRepository;
import com.hms.repository.MessageNotificationRepository;
import com.hms.service.DashboardService;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final AppointmentRepository appointmentRepo;
    private final PatientRepository patientRepo;
    private final LabReportRepository reportRepo;
    private final MessageNotificationRepository messageRepo;

    @Autowired
    public DashboardServiceImpl(
            AppointmentRepository appointmentRepo,
            PatientRepository patientRepo,
            LabReportRepository reportRepo,
            MessageNotificationRepository messageRepo) {
        this.appointmentRepo = appointmentRepo;
        this.patientRepo = patientRepo;
        this.reportRepo = reportRepo;
        this.messageRepo = messageRepo;
    }

    @Override
    public DashboardResponse getDashboardMetrics(Long doctorId) {
        int todaysAppointments = appointmentRepo.countByDoctorIdAndDate(doctorId, java.time.LocalDate.now());
        int totalPatients = patientRepo.countDistinctByDoctorId(doctorId);
        int pendingReports = reportRepo.countByDoctorIdAndStatus(doctorId, "PENDING");
        int newMessages = messageRepo.countByRecipientIdAndReadFalse(doctorId);

        return new DashboardResponse(
                todaysAppointments,
                totalPatients,
                pendingReports,
                newMessages
        );
    }
}
