package com.hms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "medication")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private boolean common;

    @Column(nullable = false)
    private boolean template;

    // Default constructor
    public Medication() {}

    // Constructor
    public Medication(String name, String description, boolean common, boolean template) {
        this.name = name;
        this.description = description;
        this.common = common;
        this.template = template;
    }

    // Getters and Setters
    public Long getMedicationId() {
        return medicationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCommon() {
        return common;
    }

    public void setCommon(boolean common) {
        this.common = common;
    }

    public boolean isTemplate() {
        return template;
    }

    public void setTemplate(boolean template) {
        this.template = template;
    }
}
