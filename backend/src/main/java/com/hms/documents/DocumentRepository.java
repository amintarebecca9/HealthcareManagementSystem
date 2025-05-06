package com.hms.documents;

import com.hms.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    List<Document> findByUploadedBy(User user);
    
    List<Document> findByRelatedToUser(User user);
    
    List<Document> findByDocumentType(Document.DocumentType documentType);
    
    List<Document> findByUploadedByAndDocumentType(User user, Document.DocumentType documentType);
    
    List<Document> findByRelatedToUserAndDocumentType(User user, Document.DocumentType documentType);
    
    Optional<Document> findById(Long id);
}
