package com.hms.service;

import com.hms.model.Document;
import com.hms.model.User;
import com.hms.repository.DocumentRepository;
import com.hms.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.hms.model.Document.DocumentType.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DocumentServiceTest {

    @InjectMocks
    private DocumentService service;

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void storeDocument_success_withRelatedUser() throws Exception {
        Long uploaderId = 1L, relatedId = 2L;
        byte[] data = "hello".getBytes();

        User uploader = new User(); uploader.setId(uploaderId);
        User related = new User(); related.setId(relatedId);

        when(file.getOriginalFilename()).thenReturn("test.txt");
        when(file.getContentType()).thenReturn("text/plain");
        when(file.getBytes()).thenReturn(data);

        when(userRepository.findById(uploaderId)).thenReturn(Optional.of(uploader));
        when(userRepository.findById(relatedId)).thenReturn(Optional.of(related));

        ArgumentCaptor<Document> captor = ArgumentCaptor.forClass(Document.class);
        Document saved = new Document("test.txt","text/plain", BILLING,"desc",uploader,related,data);
        when(documentRepository.save(any())).thenReturn(saved);

        Document result = service.storeDocument(file, BILLING, "desc", uploaderId, relatedId);

        assertSame(saved, result);
        verify(documentRepository).save(captor.capture());
        Document arg = captor.getValue();
        assertEquals("test.txt",    arg.getFileName());
        assertEquals("text/plain",  arg.getFileType());
        assertEquals(BILLING,            arg.getDocumentType());
        assertEquals("desc",         arg.getDescription());
        assertEquals(uploader,       arg.getUploadedBy());
        assertEquals(related,        arg.getRelatedToUser());
        assertArrayEquals(data,      arg.getData());
    }

    @Test
    void storeDocument_userNotFound_throws() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class,
                () -> service.storeDocument(file, OTHER, "", 1L, null),
                "User not found with id: 1");
    }

    @Test
    void storeDocument_relatedUserNotFound_throws() {
        Long uploaderId = 1L, relatedId = 2L;
        User uploader = new User(); uploader.setId(uploaderId);
        when(userRepository.findById(uploaderId)).thenReturn(Optional.of(uploader));
        when(userRepository.findById(relatedId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.storeDocument(file, BILLING, "x", uploaderId, relatedId),
                "Related user not found with id: 2");
    }

    @Test
    void storeDocument_ioException_propagates() throws Exception {
        Long uploaderId = 1L;
        User uploader = new User(); uploader.setId(uploaderId);

        when(userRepository.findById(uploaderId)).thenReturn(Optional.of(uploader));
        when(file.getOriginalFilename()).thenReturn("n");
        when(file.getContentType()).thenReturn("t");
        when(file.getBytes()).thenThrow(new IOException("fail"));

        assertThrows(IOException.class,
                () -> service.storeDocument(file, INSURANCE, "y", uploaderId, null));
    }

    @Test
    void getDocument_success() {
        Document doc = new Document();
        when(documentRepository.findById(99L)).thenReturn(Optional.of(doc));

        assertSame(doc, service.getDocument(99L));
    }

    @Test
    void getDocument_notFound_throws() {
        when(documentRepository.findById(5L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> service.getDocument(5L));
        assertTrue(ex.getMessage().contains("Document not found with id: 5"));
    }

    @Test
    void getDocumentsByUploadedUser_success() {
        Long uid = 3L;
        User u = new User(); u.setId(uid);
        List<Document> list = List.of(new Document());
        when(userRepository.findById(uid)).thenReturn(Optional.of(u));
        when(documentRepository.findByUploadedBy(u)).thenReturn(list);

        assertSame(list, service.getDocumentsByUploadedUser(uid));
    }

    @Test
    void getDocumentsByUploadedUser_userNotFound_throws() {
        when(userRepository.findById(4L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class,
                () -> service.getDocumentsByUploadedUser(4L));
    }

    @Test
    void getDocumentsByRelatedUser_success() {
        Long uid = 5L;
        User u = new User(); u.setId(uid);
        List<Document> list = List.of(new Document());
        when(userRepository.findById(uid)).thenReturn(Optional.of(u));
        when(documentRepository.findByRelatedToUser(u)).thenReturn(list);

        assertSame(list, service.getDocumentsByRelatedUser(uid));
    }

    @Test
    void getDocumentsByRelatedUser_userNotFound_throws() {
        when(userRepository.findById(6L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class,
                () -> service.getDocumentsByRelatedUser(6L));
    }

    @Test
    void getDocumentsByTypeAndUploadedUser_success() {
        Long uid = 7L;
        User u = new User(); u.setId(uid);
        List<Document> list = List.of(new Document());
        when(userRepository.findById(uid)).thenReturn(Optional.of(u));
        when(documentRepository.findByUploadedByAndDocumentType(u, LAB_REPORT)).thenReturn(list);

        assertSame(list, service.getDocumentsByTypeAndUploadedUser(LAB_REPORT, uid));
    }

    @Test
    void getDocumentsByTypeAndUploadedUser_userNotFound_throws() {
        when(userRepository.findById(8L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class,
                () -> service.getDocumentsByTypeAndUploadedUser(OTHER, 8L));
    }

    @Test
    void getDocumentsByTypeAndRelatedUser_success() {
        Long uid = 9L;
        User u = new User(); u.setId(uid);
        List<Document> list = List.of(new Document());
        when(userRepository.findById(uid)).thenReturn(Optional.of(u));
        when(documentRepository.findByRelatedToUserAndDocumentType(u, PRESCRIPTION)).thenReturn(list);

        assertSame(list, service.getDocumentsByTypeAndRelatedUser(PRESCRIPTION, uid));
    }

    @Test
    void getDocumentsByTypeAndRelatedUser_userNotFound_throws() {
        when(userRepository.findById(10L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class,
                () -> service.getDocumentsByTypeAndRelatedUser(BILLING, 10L));
    }

    @Test
    void deleteDocument_delegates() {
        service.deleteDocument(42L);
        verify(documentRepository).deleteById(42L);
    }
}
