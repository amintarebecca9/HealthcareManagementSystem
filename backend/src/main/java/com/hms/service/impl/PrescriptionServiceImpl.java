package com.hms.service.impl;

import com.hms.dto.CreatePrescriptionRequest;
import com.hms.dto.PrescriptionDto;
import com.hms.model.Doctor;
import com.hms.model.Medication;
import com.hms.model.Patient;
import com.hms.model.Prescription;
import com.hms.repository.DoctorRepository;
import com.hms.repository.MedicationRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.PrescriptionRepository;
import com.hms.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepo;
    private final MedicationRepository medicationRepo;
    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;

    @Autowired
    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepo,
                                   MedicationRepository medicationRepo,
                                   DoctorRepository doctorRepo,
                                   PatientRepository patientRepo) {
        this.prescriptionRepo = prescriptionRepo;
        this.medicationRepo = medicationRepo;
        this.doctorRepo = doctorRepo;
        this.patientRepo = patientRepo;
    }

    @Override
    public List<PrescriptionDto> getPrescriptionsByDoctor(Long doctorId, String filter) {
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return prescriptionRepo.findByDoctor(doctor).stream()
                .map(PrescriptionDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public PrescriptionDto createPrescription(Long doctorId, CreatePrescriptionRequest request) {
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Medication medication = medicationRepo.findById(request.getMedicationId())
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        Prescription presc = new Prescription(
                medication,
                doctor,
                patient,
                request.getDosage(),
                request.getFrequency(),
                request.getDuration(),
                request.getNotes()
        );
        Prescription saved = prescriptionRepo.save(presc);
        return PrescriptionDto.fromEntity(saved);
    }

    @Override
    public PrescriptionDto getPrescriptionById(Long doctorId, Long prescId) {
        Prescription presc = prescriptionRepo.findById(prescId)
                .filter(p -> p.getDoctor().getDoctorId().equals(doctorId))
                .orElseThrow(() -> new RuntimeException("Prescription not found or unauthorized"));
        return PrescriptionDto.fromEntity(presc);
    }


    @Override
    public PrescriptionDto updatePrescription(Long doctorId, Long prescId, CreatePrescriptionRequest request) {
        Prescription presc = prescriptionRepo.findById(prescId)
                .filter(p -> p.getDoctor().getDoctorId().equals(doctorId))
                .orElseThrow(() -> new RuntimeException("Prescription not found or unauthorized"));
        presc.setDosage(request.getDosage());
        presc.setFrequency(request.getFrequency());
        presc.setDuration(request.getDuration());
        presc.setNotes(request.getNotes());
        presc = prescriptionRepo.save(presc);
        return PrescriptionDto.fromEntity(presc);
    }
}