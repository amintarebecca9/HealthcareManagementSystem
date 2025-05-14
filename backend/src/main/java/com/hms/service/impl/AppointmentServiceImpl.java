package com.hms.service.impl;

import com.hms.dto.AppointmentDto;
import com.hms.dto.AppointmentRequest;
import com.hms.dto.AppointmentResponse;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository apptRepo;
    @Autowired private DoctorRepository docRepo;
    @Autowired private PatientRepository patientRepo;

    @Override
    public AppointmentDto createAppointment(Patient patient, CreateAppointmentRequest req) {
        Doctor doctor = docRepo.findByUserId(req.getDoctorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));
        Appointment appt = new Appointment();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setAppointmentDate(req.getDate());
        appt.setReasonForVisit(req.getReason());
        Appointment saved = apptRepo.save(appt);
        return new AppointmentDto(
                saved.getAppointmentId(),
                saved.getPatient().getPatientId(),
                saved.getDoctor().getDoctorId(),
                saved.getAppointmentDate(),
                saved.getReasonForVisit()
        );
    }

    @Override
    public List<Doctor> findDoctorsForPatient(Long patientId) {
        return apptRepo.findDistinctDoctorsByPatientId(patientId);
    }

    @Override
    public List<Patient> findPatientsForDoctor(Long doctorId) {
        return apptRepo.findDistinctPatientsByDoctorId(doctorId);
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId, String filter) {
        LocalDate today = LocalDate.now();
        List<Appointment> list;
        switch (filter) {
            case "today":
                list = apptRepo.findByDoctorIdAndDate(doctorId, today);
                break;
            case "upcoming":
                list = apptRepo.findByDoctorIdAndDateAfter(doctorId, today);
                break;
            case "past":
                list = apptRepo.findByDoctorIdAndDateBefore(doctorId, today);
                break;
            default:
                list = apptRepo.findByDoctorId(doctorId);
        }
        return list.stream().map(AppointmentResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    public AppointmentResponse getAppointmentByDoctor(Long doctorId, Long apptId) {
        Appointment appt = apptRepo.findByDoctorIdAndId(doctorId, apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return AppointmentResponse.fromEntity(appt);
    }

    @Override
    public AppointmentResponse createAppointmentForDoctor(Long doctorId, AppointmentRequest request) {
        Patient patient = patientRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = docRepo.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Convert the LocalDate into a LocalDateTime (start of day) and use default status
        LocalDateTime apptDateTime = request.getDate().atStartOfDay();
        String defaultStatus = "SCHEDULED";
        Appointment appt = new Appointment(
                patient,
                doctor,
                apptDateTime,
                defaultStatus,
                request.getReason()
        );
        Appointment saved = apptRepo.save(appt);
        return AppointmentResponse.fromEntity(saved);
    }

    @Override
    public AppointmentResponse updateAppointmentForDoctor(Long doctorId, Long apptId, AppointmentRequest request) {
        Appointment appt = apptRepo.findByDoctorIdAndId(doctorId, apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setAppointmentDate(request.getDate().atStartOfDay());
        appt.setReasonForVisit(request.getReason());
        Appointment updated = apptRepo.save(appt);
        return AppointmentResponse.fromEntity(updated);
    }

    @Override
    public void deleteAppointmentForDoctor(Long doctorId, Long apptId) {
        apptRepo.deleteByDoctorIdAndId(doctorId, apptId);
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId, String filter) {
        LocalDate today = LocalDate.now();
        List<Appointment> list;
        switch (filter) {
            case "today":
                list = apptRepo.findByPatientIdAndDate(patientId, today);
                break;
            case "upcoming":
                list = apptRepo.findByPatientIdAndDateAfter(patientId, today);
                break;
            case "past":
                list = apptRepo.findByPatientIdAndDateBefore(patientId, today);
                break;
            default:
                list = apptRepo.findByPatientId(patientId);
        }
        return list.stream().map(AppointmentResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    public AppointmentResponse getAppointmentByPatient(Long patientId, Long apptId) {
        Appointment appt = apptRepo.findByPatientIdAndId(patientId, apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return AppointmentResponse.fromEntity(appt);
    }

    @Override
    public AppointmentResponse createAppointmentForPatient(Long patientId, AppointmentRequest request) {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = docRepo.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        LocalDateTime apptDateTime = request.getDate().atStartOfDay();
        String defaultStatus = "SCHEDULED";

        // Construct the Appointment entity
        Appointment appt = new Appointment(
                patient,
                doctor,
                apptDateTime,
                defaultStatus,
                request.getReason()
        );

        Appointment saved = apptRepo.save(appt);
        return AppointmentResponse.fromEntity(saved);
    }

    @Override
    public AppointmentResponse updateAppointmentForPatient(Long patientId, Long apptId, AppointmentRequest request) {
        Appointment appt = apptRepo.findByPatientIdAndId(patientId, apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setAppointmentDate(request.getDate().atStartOfDay());
        appt.setReasonForVisit(request.getReason());
        Appointment updated = apptRepo.save(appt);
        return AppointmentResponse.fromEntity(updated);
    }

    @Override
    public void deleteAppointmentForPatient(Long patientId, Long apptId) {
        apptRepo.deleteByPatientIdAndId(patientId, apptId);
    }

}

