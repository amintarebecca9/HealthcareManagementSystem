package com.hms.controller;

import com.hms.dto.ConversationDto;
import com.hms.dto.MessageDto;
import com.hms.model.MessageNotification;
import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.service.SecureMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/secure-messages")
public class SecureMessageController {

    @Autowired
    private SecureMessageService msgService;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/send")
    public MessageNotification send(
            Authentication authentication,
            @RequestParam Long toUserId,
            @RequestParam String type,
            @RequestParam String content,
            @RequestParam(required = false) Long prescriptionId,
            @RequestParam(required = false) Long labReportId) {

        // load sender from Authentication
        String username = authentication.getName();
        User sender = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Sender not found"));

        // load receiver
        User receiver = userRepo.findById(toUserId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Receiver not found"));

        return msgService.sendMessage(sender, receiver, type, content, prescriptionId, labReportId);
    }

    @GetMapping("/inbox")
    public List<MessageNotification> inbox(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));
        return msgService.getInbox(user);
    }

    @GetMapping("/sent")
    public List<MessageNotification> sent(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));
        return msgService.getSent(user);
    }

    @PostMapping("/{id}/read")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markRead(
            Authentication authentication,
            @PathVariable Long id) {

        String username = authentication.getName();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        msgService.markAsRead(id, user);
    }

    @GetMapping("/conversations")
    public List<ConversationDto> listConversations(Authentication auth) {
        User me = userRepo.findByUsername(auth.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return msgService.listConversations(me);
    }

    @GetMapping("/{partnerId}/messages")
    public List<MessageDto> getHistory(@PathVariable Long partnerId, Authentication auth) {
        User me = userRepo.findByUsername(auth.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return msgService.fetchAndMarkRead(me, partnerId);
    }
}
