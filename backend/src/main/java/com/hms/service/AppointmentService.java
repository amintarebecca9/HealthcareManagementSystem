package com.hms.service;

import com.hms.dto.AppointmentDto;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Doctor;
import com.hms.model.Patient;

import java.util.List;

public interface AppointmentService {
    AppointmentDto createAppointment(Patient patient, CreateAppointmentRequest req);
    List<Doctor> findDoctorsForPatient(Long patientId);
    List<Patient> findPatientsForDoctor(Long doctorId);
}

