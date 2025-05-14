package com.hms.controller;

import com.hms.model.User;
import com.hms.model.Document;
import com.hms.repository.UserRepository;
import com.hms.service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DocumentControllerTest {

    @InjectMocks
    private DocumentController controller;

    @Mock
    private DocumentService documentService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Principal principal;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.clearContext();
        // create a dummy Authentication and stick it in the SecurityContext
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("alice");                       // matches your principal
        when(auth.getAuthorities()).thenReturn(Collections.emptyList());
        when(auth.getPrincipal()).thenReturn(principal);                // or a UserDetails instance
        when(auth.isAuthenticated()).thenReturn(true);

        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    //
    // uploadDocument(...)
    //

    @Test
    void uploadDocument_principalNull_returns401() throws Exception {
        var file = new MockMultipartFile("file", "foo.txt", "text/plain", "hello".getBytes());

        ResponseEntity<?> resp = controller.uploadDocument(
                /*principal=*/null,
                file,
                "PDF",
                "desc",
                /*relatedUserId=*/1L
        );

        assertEquals(401, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertEquals("You must be logged in to upload files", body.get("error"));
    }

    @Test
    void uploadDocument_invalidType_returns400() throws Exception {
        when(principal.getName()).thenReturn("alice");
        var user = new User(); user.setId(100L); user.setUsername("alice");
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));
        var file = new MockMultipartFile("file", "foo.txt", "text/plain", "hello".getBytes());

        ResponseEntity<?> resp = controller.uploadDocument(
                principal,
                file,
                "NOT_A_TYPE",
                "desc",
                null
        );

        assertEquals(400, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertEquals("Invalid document type: NOT_A_TYPE", body.get("error"));
    }

    @Test
    void uploadDocument_emptyFile_returns400() throws Exception {
        when(principal.getName()).thenReturn("bob");
        var user = new User(); user.setId(200L); user.setUsername("bob");
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(user));

        // empty content
        var file = new MockMultipartFile("file", "empty.pdf", "application/pdf", new byte[0]);

        ResponseEntity<?> resp = controller.uploadDocument(
                principal,
                file,
                Document.DocumentType.PRESCRIPTION.name(),   // <-- real enum
                "desc",
                42L
        );

        assertEquals(400, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertEquals("File is empty", body.get("error"));
    }

    @Test
    void uploadDocument_serviceThrowsIOException_returns400() throws Exception {
        when(principal.getName()).thenReturn("carol");
        var user = new User(); user.setId(300L); user.setUsername("carol");
        when(userRepository.findByUsername("carol")).thenReturn(Optional.of(user));
        var file = new MockMultipartFile("file", "doc.pdf", "application/pdf", "data".getBytes());

        doThrow(new IOException("disk fail"))
                .when(documentService)
                .storeDocument(eq(file), eq(Document.DocumentType.MEDICAL_RECORD), eq("desc"), eq(300L), eq(7L));

        ResponseEntity<?> resp = controller.uploadDocument(
                principal,
                file,
                Document.DocumentType.MEDICAL_RECORD.name(),
                "desc",
                7L
        );

        assertEquals(400, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertTrue(((String)body.get("error")).contains("Could not upload file: disk fail"));
    }

    @Test
    void uploadDocument_serviceThrowsRuntime_returns500() throws Exception {
        when(principal.getName()).thenReturn("dave");
        var user = new User(); user.setId(400L); user.setUsername("dave");
        when(userRepository.findByUsername("dave")).thenReturn(Optional.of(user));
        var file = new MockMultipartFile("file", "docx.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "x".getBytes());

        doThrow(new RuntimeException("oops"))
                .when(documentService)
                .storeDocument(eq(file), eq(Document.DocumentType.LAB_REPORT), eq("notes"), eq(400L), isNull());

        ResponseEntity<?> resp = controller.uploadDocument(
                principal,
                file,
                Document.DocumentType.LAB_REPORT.name(),
                "notes",
                null
        );

        assertEquals(500, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertTrue(((String)body.get("error")).contains("Internal server error: oops"));
    }

    @Test
    void uploadDocument_success_returns200WithMap() throws Exception {
        when(principal.getName()).thenReturn("eve");
        var user = new User(); user.setId(500L); user.setUsername("eve");
        when(userRepository.findByUsername("eve")).thenReturn(Optional.of(user));
        var file = new MockMultipartFile("file", "report.pdf", "application/pdf", "abc".getBytes());
        var saved = new Document();
        saved.setId(88L);
        saved.setFileName("report.pdf");

        when(documentService.storeDocument(eq(file), eq(Document.DocumentType.INSURANCE), eq("plan"), eq(500L), eq(55L)))
                .thenReturn(saved);

        ResponseEntity<?> resp = controller.uploadDocument(
                principal,
                file,
                Document.DocumentType.INSURANCE.name(),
                "plan",
                55L
        );

        assertEquals(200, resp.getStatusCodeValue());
        var body = (Map<?,?>) resp.getBody();
        assertEquals("Document uploaded successfully", body.get("message"));
        assertEquals(88L, body.get("documentId"));
        assertEquals("report.pdf", body.get("fileName"));
    }

    @Test
    void getDocumentsByType_success_usesSecurityContext() {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("harry");
        SecurityContextHolder.getContext().setAuthentication(auth);

        var user = new User(); user.setId(33L); user.setUsername("harry");
        when(userRepository.findByUsername("harry")).thenReturn(Optional.of(user));

        var doc = new Document();
        doc.setId(44L);
        doc.setFileName("z.doc");
        doc.setFileType("application/msword");
        doc.setDocumentType(Document.DocumentType.BILLING);  // <-- real enum
        doc.setDescription("d");
        doc.setUploadDate(LocalDateTime.of(2025,5,1,12,0));
        doc.setUploadedBy(user);
        doc.setRelatedToUser(user);

        when(documentService.getDocumentsByTypeAndRelatedUser(Document.DocumentType.BILLING, 33L))
                .thenReturn(List.of(doc));

        ResponseEntity<?> resp = controller.getDocumentsByType(Document.DocumentType.BILLING.name());

        assertEquals(200, resp.getStatusCodeValue());
        var list = (List<?>)resp.getBody();
        var m = (Map<?,?>)list.get(0);

        assertEquals(44L, m.get("id"));
        assertEquals("z.doc", m.get("fileName"));
    }


    @Test
    void getDocument_success() {
        byte[] data = {1,2,3};
        Document doc = new Document();
        doc.setFileType("application/pdf");
        doc.setFileName("test.pdf");
        doc.setData(data);

        when(documentService.getDocument(123L)).thenReturn(doc);

        ResponseEntity<?> resp = controller.getDocument(123L);

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(MediaType.APPLICATION_PDF, resp.getHeaders().getContentType());
        assertEquals(
                "attachment; filename=\"test.pdf\"",
                resp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION)
        );
        assertTrue(resp.getBody() instanceof ByteArrayResource);
        assertArrayEquals(data, ((ByteArrayResource)resp.getBody()).getByteArray());

        verify(documentService).getDocument(123L);
    }


    @Test
    void getMyDocuments_noPrincipal_returns401() {
        ResponseEntity<?> resp = controller.getMyDocuments(null);

        assertEquals(HttpStatus.UNAUTHORIZED, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        Map<String,String> body = (Map<String,String>) resp.getBody();
        assertEquals("Authentication required", body.get("error"));
    }

    @Test
    void getMyDocuments_userNotFound_returns500() {
        when(principal.getName()).thenReturn("unknown");
        when(userRepository.findByUsername("unknown"))
                .thenReturn(Optional.empty());

        ResponseEntity<?> resp = controller.getMyDocuments(principal);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        Map<String,String> body = (Map<String,String>) resp.getBody();
        assertTrue(body.get("error")
                .contains("Failed to get documents: User not found: unknown"));
    }

    @Test
    void getMyDocuments_success_mapsAndReturns() {
        when(principal.getName()).thenReturn("john");
        User user = new User();
        user.setId(10L);
        user.setUsername("john");
        when(userRepository.findByUsername("john"))
                .thenReturn(Optional.of(user));

        Document d = new Document();
        d.setId(55L);
        d.setFileName("a.txt");
        d.setFileType("text/plain");
        d.setDocumentType(Document.DocumentType.LAB_REPORT);
        d.setDescription(null);
        d.setUploadDate(LocalDateTime.of(2025,1,1,0,0));
        d.setUploadedBy(user);
        d.setRelatedToUser(null);

        when(documentService.getDocumentsByUploadedUser(10L))
                .thenReturn(List.of(d));

        ResponseEntity<?> resp = controller.getMyDocuments(principal);

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        List<Map<String,Object>> list = (List<Map<String,Object>>) resp.getBody();
        assertEquals(1, list.size());

        Map<String,Object> m = list.get(0);
        assertEquals(55L,      m.get("id"));
        assertEquals("a.txt",  m.get("fileName"));
        assertEquals("text/plain", m.get("fileType"));
        assertEquals(Document.DocumentType.LAB_REPORT, m.get("documentType"));
        assertEquals("",       m.get("description"));      // null → ""
        assertEquals("2025-01-01T00:00", m.get("uploadDate"));
        assertEquals("john",   m.get("uploadedBy"));
        assertNull(m.get("relatedToUser"));
    }

    @Test
    void getRelatedDocuments_noPrincipal_returns401() {
        ResponseEntity<?> resp = controller.getRelatedDocuments(null);

        assertEquals(HttpStatus.UNAUTHORIZED, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        Map<String,String> body = (Map<String,String>) resp.getBody();
        assertEquals("Authentication required", body.get("error"));
    }

    @Test
    void getRelatedDocuments_userNotFound_returns500() {
        when(principal.getName()).thenReturn("nobody");
        when(userRepository.findByUsername("nobody"))
                .thenReturn(Optional.empty());

        ResponseEntity<?> resp = controller.getRelatedDocuments(principal);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        Map<String,String> body = (Map<String,String>) resp.getBody();
        assertTrue(body.get("error")
                .contains("Failed to get related documents: User not found: nobody"));
    }

    @Test
    void getRelatedDocuments_success_mapsAndReturns() {
        when(principal.getName()).thenReturn("gina");
        User user = new User(); user.setId(24L); user.setUsername("gina");
        when(userRepository.findByUsername("gina"))
                .thenReturn(Optional.of(user));

        Document d = new Document();
        d.setId(22L);
        d.setFileName("y.pdf");
        d.setFileType("application/pdf");
        d.setDocumentType(Document.DocumentType.PRESCRIPTION);
        d.setDescription("notes");
        d.setUploadDate(null);
        d.setUploadedBy(null);
        d.setRelatedToUser(user);

        when(documentService.getDocumentsByRelatedUser(24L))
                .thenReturn(List.of(d));

        ResponseEntity<?> resp = controller.getRelatedDocuments(principal);

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        @SuppressWarnings("unchecked")
        List<Map<String,Object>> list = (List<Map<String,Object>>) resp.getBody();
        assertEquals(1, list.size());

        Map<String,Object> m = list.get(0);
        assertEquals(22L,       m.get("id"));
        assertEquals("y.pdf",   m.get("fileName"));
        assertEquals("",        m.get("uploadDate"));     // null → ""
        assertEquals("Unknown", m.get("uploadedBy"));
        assertEquals("gina",    m.get("relatedToUser"));
    }
}