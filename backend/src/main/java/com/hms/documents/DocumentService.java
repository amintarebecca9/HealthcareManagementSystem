package com.hms.documents;

import com.hms.auth.User;
import com.hms.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Document storeDocument(MultipartFile file, Document.DocumentType documentType, 
                                String description, Long uploadedById, Long relatedToUserId) throws IOException {
        
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        
        User uploadedBy = userRepository.findById(uploadedById)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + uploadedById));
        
        User relatedToUser = null;
        if (relatedToUserId != null) {
            relatedToUser = userRepository.findById(relatedToUserId)
                    .orElseThrow(() -> new RuntimeException("Related user not found with id: " + relatedToUserId));
        }
        
        Document document = new Document(
            fileName,
            fileType,
            documentType,
            description,
            uploadedBy,
            relatedToUser,
            file.getBytes()
        );
        
        return documentRepository.save(document);
    }
    
    public Document getDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
    }
    
    public List<Document> getDocumentsByUploadedUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
                
        return documentRepository.findByUploadedBy(user);
    }
    
    public List<Document> getDocumentsByRelatedUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
                
        return documentRepository.findByRelatedToUser(user);
    }
    
    public List<Document> getDocumentsByTypeAndUploadedUser(Document.DocumentType type, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
                
        return documentRepository.findByUploadedByAndDocumentType(user, type);
    }
    
    public List<Document> getDocumentsByTypeAndRelatedUser(Document.DocumentType type, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
                
        return documentRepository.findByRelatedToUserAndDocumentType(user, type);
    }
    
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
