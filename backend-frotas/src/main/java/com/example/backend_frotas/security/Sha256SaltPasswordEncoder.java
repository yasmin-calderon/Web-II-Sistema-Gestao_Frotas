package com.example.backend_frotas.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class Sha256SaltPasswordEncoder implements PasswordEncoder {
    private static final int SALT_LENGTH = 16; // bytes

    private String generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    private String hash(String rawPassword, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String salted = rawPassword + salt;
            byte[] hash = md.digest(salted.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 not available", e);
        }
    }

    @Override
    public String encode(CharSequence rawPassword) {
        String salt = generateSalt();
        String hash = hash(rawPassword.toString(), salt);
        return salt + ":" + hash;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (encodedPassword == null || !encodedPassword.contains(":")) {
            return false;
            
        }
        String[] parts = encodedPassword.split("\\:");
        if (parts.length != 2) return false;
        String salt = parts[0];
        String hash = parts[1];
        String inputHash = hash(rawPassword.toString(), salt);
        return inputHash.equals(hash);
    }
}