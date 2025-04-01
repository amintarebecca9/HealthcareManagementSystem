package com.example.healthcare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "prescription")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id", nullable = false)
    private Integer prescriptionId;

    @Column(name = "medication_name", length = 100)
    private String medicationName;

    @Column(name = "dosage", length = 50)
    private String dosage;

    @Column(name = "frequency", length = 50)
    private String frequency;

    @Column(name = "duration", length = 50)
    private String duration;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    public Prescription() {
    }

    public Prescription(String medicationName, String dosage, String frequency, String duration, String notes) {
        this.medicationName = medicationName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.notes = notes;
    }

    public Integer getPrescriptionId() {
        return prescriptionId;
    }

    public String getMedicationName() {
        return medicationName;
    }

    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
