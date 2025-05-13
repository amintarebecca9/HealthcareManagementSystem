//package com.hms.controller;
//
//import com.hms.dto.ConversationDto;
//import com.hms.dto.MessageDto;
//import com.hms.dto.SendMessageDto;
//import com.hms.model.MessageNotification;
//import com.hms.model.User;
//import com.hms.repository.AppointmentRepository;
//import com.hms.repository.MessageNotificationRepository;
//import com.hms.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.security.Principal;
//import java.util.List;
//
//// src/main/java/com/hms/controller/ConversationController.java
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/conversations")
//public class ConversationController {
//    @Autowired
//    private UserRepository userRepo;
//    @Autowired
//    private AppointmentRepository apptRepo;
//    @Autowired
//    private MessageNotificationRepository msgRepo;
//
//    // 1) List all partners with unread counts
//    @GetMapping
//    public List<ConversationDto> list(Principal p) {
//        User me = userRepo.findByUsername(p.getName())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
//        List<User> partners = me.getRole().equals("DOCTOR")
//                ? apptRepo.findDistinctPatientsByDoctorId(me.getId())
//                : apptRepo.findDistinctDoctorsByPatientId(me.getId());
//
//        return partners.stream()
//                .map(u -> new ConversationDto(
//                        u.getId(),
//                        u.getUsername(),
//                        msgRepo.countUnread(me.getId(), u.getId())
//                ))
//                .toList();
//    }
//
//    // 2) Fetch full history and mark as read
//    @GetMapping("/{partnerId}/messages")
//    public List<MessageDto> history(@PathVariable Long partnerId, Principal p) {
//        User me = userRepo.findByUsername(p.getName())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
//        User partner = userRepo.findById(partnerId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        // mark unread as read
//        msgRepo.findConversation(me.getId(), partnerId).stream()
//                .filter(m -> !m.getIsRead() && m.getReceiver().equals(me))
//                .forEach(m -> { m.setIsRead(true); msgRepo.save(m); });
//
//        return msgRepo.findConversation(me.getId(), partnerId).stream()
//                .map(m -> new MessageDto(
//                        m.getMessageId(),
//                        m.getSender().getId(),
//                        m.getSender().getUsername(),
//                        m.getContent(),
//                        m.getTimestamp()
//                ))
//                .toList();
//    }
//
//    // 3) Send a new message
//    @PostMapping("/{partnerId}/messages")
//    public MessageDto post(
//            @PathVariable Long partnerId,
//            @RequestBody SendMessageDto body,
//            Principal p
//    ) {
//        User sender = userRepo.findByUsername(p.getName())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
//        User receiver = userRepo.findById(partnerId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        MessageNotification m = new MessageNotification(sender, receiver,null, /*type=*/"TEXT",
//                body.getContent(), false, false, null, null);
//        MessageNotification saved = msgRepo.save(m);
//        return new MessageDto(
//                saved.getMessageId(),
//                sender.getId(),
//                sender.getUsername(),
//                saved.getContent(),
//                saved.getTimestamp()
//        );
//    }
//}
