package com.hms.model;

import jakarta.persistence.*;


@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer roleId;

    @Column(length = 50, nullable = false)
    private String roleName;

    // Default constructor
    public Role() {}

    // Constructor with field
    public Role(String roleName) {
        this.roleName = roleName;
    }

    // Getters and Setters
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}

