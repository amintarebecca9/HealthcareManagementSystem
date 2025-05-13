package com.hms.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ehr")
public class EHR {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer ehrId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "created_by_doctor_id")
    private Doctor createdByDoctor;

    @Column(nullable = false)
    private LocalDateTime recordDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String treatmentPlan;

    @ManyToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    // Default constructor
    public EHR() {}

    // Constructor with fields
    public EHR(Patient patient, Doctor createdByDoctor, LocalDateTime recordDate,
               String notes, String diagnosis, String treatmentPlan, Prescription prescription) {
        this.patient = patient;
        this.createdByDoctor = createdByDoctor;
        this.recordDate = recordDate;
        this.notes = notes;
        this.diagnosis = diagnosis;
        this.treatmentPlan = treatmentPlan;
        this.prescription = prescription;
    }

    // Getters and Setters
    public Integer getEhrId() {
        return ehrId;
    }

    public void setEhrId(Integer ehrId) {
        this.ehrId = ehrId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getCreatedByDoctor() {
        return createdByDoctor;
    }

    public void setCreatedByDoctor(Doctor createdByDoctor) {
        this.createdByDoctor = createdByDoctor;
    }

    public LocalDateTime getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(LocalDateTime recordDate) {
        this.recordDate = recordDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
}

