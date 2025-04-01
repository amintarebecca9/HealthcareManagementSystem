package com.example.healthcare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor")
public class Doctor {

    /**
     * doctor_id is the PRIMARY KEY and references user(user_id).
     * We use @MapsId so that doctor_id == user_id.
     */
    @Id
    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "doctor_id")
    private User user;

    @Column(name = "specialization", length = 100)
    private String specialization;

    @Column(name = "license_number", length = 50)
    private String licenseNumber;

    @Column(name = "hospital_affiliation", length = 100)
    private String hospitalAffiliation;

    public Doctor() {
    }

    public Doctor(User user, String specialization, String licenseNumber, String hospitalAffiliation) {
        this.user = user;
        this.specialization = specialization;
        this.licenseNumber = licenseNumber;
        this.hospitalAffiliation = hospitalAffiliation;
    }

    public Integer getDoctorId() {
        return doctorId;
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
