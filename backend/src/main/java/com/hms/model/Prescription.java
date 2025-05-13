package com.hms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "prescription")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer prescriptionId;

    @Column(length = 100)
    private String medicationName;

    @Column(length = 50)
    private String dosage;

    @Column(length = 50)
    private String frequency;

    @Column(length = 50)
    private String duration;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Default constructor
    public Prescription() {}

    // Constructor with fields
    public Prescription(String medicationName,
                        String dosage,
                        String frequency,
                        String duration,
                        String notes) {
        this.medicationName = medicationName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.notes = notes;
    }

    // Getters and Setters
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

