package com.hms.dto;

// src/main/java/com/hms/dto/ConversationDto.java
public record ConversationDto(
        Long partnerId,
        String partnerName,
        long unreadCount
) {}

