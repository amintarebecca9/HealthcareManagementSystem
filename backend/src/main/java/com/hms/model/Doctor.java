package com.hms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @Column(nullable = false)
    private Integer doctorId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "doctor_id")
    private User user;

    @Column(length = 100)
    private String specialization;

    @Column(length = 50)
    private String licenseNumber;

    @Column(length = 100)
    private String hospitalAffiliation;

    // Default constructor
    public Doctor() {}

    // Constructor with fields
    public Doctor(User user, String specialization, String licenseNumber, String hospitalAffiliation) {
        this.user = user;
        this.specialization = specialization;
        this.licenseNumber = licenseNumber;
        this.hospitalAffiliation = hospitalAffiliation;
    }

    // Getters and Setters
    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getHospitalAffiliation() {
        return hospitalAffiliation;
    }

    public void setHospitalAffiliation(String hospitalAffiliation) {
        this.hospitalAffiliation = hospitalAffiliation;
    }
}
