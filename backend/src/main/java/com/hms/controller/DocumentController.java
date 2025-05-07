package com.hms.controller;

import com.hms.model.User;
import com.hms.model.Document;
import com.hms.repository.UserRepository;
import com.hms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            Principal principal,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @RequestParam("description") String description,
            @RequestParam(value = "relatedUserId", required = false) Long relatedUserId) {
        
        try {
            if (principal == null) {
                System.err.println("Principal is null - user not authenticated");
                return ResponseEntity.status(401).body(Map.of("error", "You must be logged in to upload files"));
            }
            
            String currentUsername = principal.getName();
            System.out.println("Upload request from principal: " + currentUsername);
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authentication details:");
            System.out.println(" - Name: " + authentication.getName());
            System.out.println(" - Authorities: " + authentication.getAuthorities());
            System.out.println(" - Principal: " + authentication.getPrincipal());
            System.out.println(" - Is authenticated: " + authentication.isAuthenticated());
            
            User currentUser = userRepository.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("User not found: " + currentUsername));
            
            System.out.println("Found user: " + currentUser.getId() + " - " + currentUser.getUsername());
            
            Document.DocumentType docType;
            try {
                docType = Document.DocumentType.valueOf(documentType);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid document type: " + documentType));
            }
            
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
            }
            
            System.out.println("Processing file: " + file.getOriginalFilename() + " (" + file.getSize() + " bytes)");
            
            Document document = documentService.storeDocument(
                file, docType, description, currentUser.getId(), relatedUserId);
            
            return ResponseEntity.ok(Map.of(
                "message", "Document uploaded successfully",
                "documentId", document.getId(),
                "fileName", document.getFileName()
            ));
            
        } catch (IOException e) {
            System.err.println("IO Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Could not upload file: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error in document upload: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getDocument(@PathVariable Long id) {
        Document document = documentService.getDocument(id);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getFileName() + "\"")
                .body(new ByteArrayResource(document.getData()));
    }
    
    @GetMapping("/my-documents")
    public ResponseEntity<?> getMyDocuments(Principal principal) {
        try {
            if (principal == null) {
                System.err.println("Principal is null in getMyDocuments");
                return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
            }
            
            String currentUsername = principal.getName();
            System.out.println("Fetching documents for user: " + currentUsername);
            
            User currentUser = userRepository.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("User not found: " + currentUsername));
            
            List<Document> documents = documentService.getDocumentsByUploadedUser(currentUser.getId());
            System.out.println("Found " + documents.size() + " documents for user: " + currentUsername);
            
            List<Map<String, Object>> documentResponses = documents.stream()
                    .map(this::convertToDocumentResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(documentResponses);
        } catch (Exception e) {
            System.err.println("Error in getMyDocuments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to get documents: " + e.getMessage()));
        }
    }
    
    @GetMapping("/related-documents")
    public ResponseEntity<?> getRelatedDocuments(Principal principal) {
        try {
            if (principal == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
            }
            
            String currentUsername = principal.getName();
            System.out.println("Fetching related documents for user: " + currentUsername);
            
            User currentUser = userRepository.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("User not found: " + currentUsername));
            
            List<Document> documents = documentService.getDocumentsByRelatedUser(currentUser.getId());
            System.out.println("Found " + documents.size() + " related documents for user: " + currentUsername);
            
            List<Map<String, Object>> documentResponses = documents.stream()
                    .map(this::convertToDocumentResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(documentResponses);
        } catch (Exception e) {
            System.err.println("Error in getRelatedDocuments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to get related documents: " + e.getMessage()));
        }
    }
    
    @GetMapping("/by-type/{documentType}")
    public ResponseEntity<?> getDocumentsByType(@PathVariable String documentType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found: " + currentUsername));
        
        Document.DocumentType docType = Document.DocumentType.valueOf(documentType);
        
        List<Map<String, Object>> documents = documentService.getDocumentsByTypeAndRelatedUser(docType, currentUser.getId())
                .stream()
                .map(this::convertToDocumentResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(documents);
    }
    
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Could not delete document: " + e.getMessage()));
        }
    }
    
    private Map<String, Object> convertToDocumentResponse(Document document) {
        Map<String, Object> responseMap = new HashMap<>();
        
        responseMap.put("id", document.getId());
        responseMap.put("fileName", document.getFileName());
        responseMap.put("fileType", document.getFileType());
        responseMap.put("documentType", document.getDocumentType());
        responseMap.put("description", document.getDescription() != null ? document.getDescription() : "");
        
        if (document.getUploadDate() != null) {
            responseMap.put("uploadDate", document.getUploadDate().toString());
        } else {
            responseMap.put("uploadDate", "");
        }
        
        if (document.getUploadedBy() != null) {
            responseMap.put("uploadedBy", document.getUploadedBy().getUsername());
        } else {
            responseMap.put("uploadedBy", "Unknown");
        }
        
        if (document.getRelatedToUser() != null) {
            responseMap.put("relatedToUser", document.getRelatedToUser().getUsername());
        } else {
            responseMap.put("relatedToUser", null);
        }
        
        return responseMap;
    }
}
