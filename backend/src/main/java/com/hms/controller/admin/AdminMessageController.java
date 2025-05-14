package com.hms.controller.admin;

import com.hms.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.hms.service.SecureMessageService;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminMessageController {

    private final SecureMessageService secureMessageService;

    @Autowired
    public AdminMessageController(SecureMessageService secureMessageService) {
        this.secureMessageService = secureMessageService;
    }

    @GetMapping
    public ResponseEntity<List<MessageDto>> listMessages() {
        return ResponseEntity.ok(
                secureMessageService.getInbox(/* adminUser */ null)
                        .stream()
                        .map(m -> new MessageDto(
                                m.getMessageId(),
                                m.getSender().getId(),
                                m.getReceiver().getId(),
                                m.getType(),
                                m.getContent(),
                                m.getPrescription() != null ? m.getPrescription() : null,
                                m.getLabReport() != null ? m.getLabReport() : null,
                                m.getTimestamp(),
                                m.getIsRead()
                        ))
                        .collect(java.util.stream.Collectors.toList())
                       );
    }
}