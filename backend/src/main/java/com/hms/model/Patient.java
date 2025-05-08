package com.hms.model;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @OneToOne(cascade = CascadeType.MERGE)
    @MapsId
    @JoinColumn(name = "patient_id")
    private User user;

    @Column
    private LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String insuranceProvider;

    @Column(length = 100)
    private String emergencyContact;

    // Default constructor
    public Patient() {}

    // Constructor with fields
    public Patient(User user,
                   LocalDate dateOfBirth,
                   String gender,
                   String address,
                   String insuranceProvider,
                   String emergencyContact) {
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.insuranceProvider = insuranceProvider;
        this.emergencyContact = emergencyContact;
    }

    // Getters and Setters
    public Long getPatientId() {
        return patientId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
}
