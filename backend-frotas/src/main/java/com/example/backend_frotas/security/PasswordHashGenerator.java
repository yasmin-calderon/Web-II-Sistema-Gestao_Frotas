package com.example.backend_frotas.security;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        Sha256SaltPasswordEncoder encoder = new Sha256SaltPasswordEncoder();

        String passwordAdmin = "abc123"; // Senha para usuarios criados no BD para teste (6+ caracteres)
        String hashedPasswordAdmin = encoder.encode(passwordAdmin);
        System.out.println("Hash para '" + passwordAdmin + "': " + hashedPasswordAdmin);

        // Gerar hashes para outras senhas se necessário
    }
}
