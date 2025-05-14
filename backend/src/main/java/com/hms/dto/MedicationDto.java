package com.hms.dto;

import com.hms.model.Medication;

public class MedicationDto {
    private Long id;
    private String name;
    private boolean common;
    private boolean template;

    public static MedicationDto fromEntity(Medication m) {
        MedicationDto dto = new MedicationDto();
        dto.id = m.getMedicationId();
        dto.name = m.getName();
        dto.common = m.isCommon();
        dto.template = m.isTemplate();
        return dto;
    }

    // getters
}