package com.example.healthcare.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patient")
public class Patient {

    /**
     * patient_id is the PRIMARY KEY and references user(user_id).
     * We use @MapsId to tie this entity's primary key to the same value as User's ID.
     */
    @Id
    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "patient_id")
    private User user;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "insurance_provider", length = 100)
    private String insuranceProvider;

    @Column(name = "emergency_contact", length = 100)
    private String emergencyContact;

    public Patient() {
    }

    // Convenient constructor (optional)
    public Patient(User user, LocalDate dateOfBirth, String gender,
                   String address, String insuranceProvider, String emergencyContact) {
        this.user = user; // user has its own userId
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.insuranceProvider = insuranceProvider;
        this.emergencyContact = emergencyContact;
    }

    public Integer getPatientId() {
        return patientId;
    }

    // No direct setter for ID because we rely on the user ID
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
