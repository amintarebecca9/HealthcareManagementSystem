package com.hms.service;

import com.hms.dto.AppointmentDto;
import com.hms.dto.AppointmentRequest;
import com.hms.dto.AppointmentResponse;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Doctor;
import com.hms.model.Patient;

import java.util.List;

public interface AppointmentService {
    AppointmentDto createAppointment(Patient patient, CreateAppointmentRequest req);
    List<Doctor> findDoctorsForPatient(Long patientId);
    List<Patient> findPatientsForDoctor(Long doctorId);
    List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId, String filter);
    AppointmentResponse getAppointmentByDoctor(Long doctorId, Long apptId);
    AppointmentResponse createAppointmentForDoctor(Long doctorId, AppointmentRequest request);
    AppointmentResponse updateAppointmentForDoctor(Long doctorId, Long apptId, AppointmentRequest request);
    void deleteAppointmentForDoctor(Long doctorId, Long apptId);
    List<AppointmentResponse> getAppointmentsByPatient(Long patientId, String filter);
    AppointmentResponse getAppointmentByPatient(Long patientId, Long apptId);
    AppointmentResponse createAppointmentForPatient(Long patientId, AppointmentRequest request);
    AppointmentResponse updateAppointmentForPatient(Long patientId, Long apptId, AppointmentRequest request);
    void deleteAppointmentForPatient(Long patientId, Long apptId);
}

