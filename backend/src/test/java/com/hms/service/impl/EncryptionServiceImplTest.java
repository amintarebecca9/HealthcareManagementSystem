package com.hms.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EncryptionServiceImplTest {

    // 16-byte key for AES-128
    private static final String VALID_KEY = "0123456789ABCDEF";
    private EncryptionServiceImpl encryptionService;

    @BeforeEach
    void setUp() {
        encryptionService = new EncryptionServiceImpl(VALID_KEY);
    }

    @Test
    void encryptDecrypt_roundTrip() {
        String plaintext = "Hello, AES!";
        String cipherText = encryptionService.encrypt(plaintext);

        assertNotNull(cipherText, "Cipher text should not be null");
        assertNotEquals(plaintext, cipherText, "Cipher text should differ from plaintext");

        String decrypted = encryptionService.decrypt(cipherText);
        assertEquals(plaintext, decrypted, "Decrypted text should match original plaintext");
    }

    @Test
    void encrypt_samePlaintextProducesSameCipher() {
        String plaintext = "RepeatMe";
        String first = encryptionService.encrypt(plaintext);
        String second = encryptionService.encrypt(plaintext);
        assertEquals(first, second, "Encrypting the same plaintext twice should yield the same cipher");
    }

    @Test
    void decrypt_invalidBase64_throwsRuntime() {
        assertThrows(RuntimeException.class, () -> encryptionService.decrypt("not-base64!"));
    }

    @Test
    void decrypt_tamperedCipher_throwsRuntime() {
        String plaintext = "SensitiveData";
        String cipherText = encryptionService.encrypt(plaintext);

        // flip last character
        char last = cipherText.charAt(cipherText.length() - 1);
        String tampered = cipherText.substring(0, cipherText.length() - 1)
                + (last == 'A' ? 'B' : 'A');

        assertThrows(RuntimeException.class, () -> encryptionService.decrypt(tampered));
    }

    @Test
    void encrypt_withInvalidKeyLength_throwsRuntime() {
        // AES requires 16, 24, or 32 byte key; here we supply 8 bytes
        EncryptionServiceImpl badService = new EncryptionServiceImpl("shortkey");
        assertThrows(RuntimeException.class, () -> badService.encrypt("data"));
    }
}
