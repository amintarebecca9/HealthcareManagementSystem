package com.hms.service.impl;

import com.hms.dto.AppointmentDto;
import com.hms.dto.CreateAppointmentRequest;
import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository apptRepo;
    @Autowired private DoctorRepository docRepo;

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
}

