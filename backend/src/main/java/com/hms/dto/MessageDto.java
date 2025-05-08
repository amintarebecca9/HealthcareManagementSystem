package com.hms.dto;

import java.time.LocalDateTime;

public record MessageDto(
        Long id,
        Long senderId,
        String senderName,
        String content,
        LocalDateTime timestamp
) {}
