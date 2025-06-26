package com.example.backend_frotas.security;

public class PasswordHashChecker {
    public static void main(String[] args) {
        Sha256SaltPasswordEncoder encoder = new Sha256SaltPasswordEncoder();

        // O hash e salt que você inseri no banco:
        String hashDoBanco = "qTvSM7+LI6QQ9MkjsOExhb76z3tHIpEYu1/FxwOx2pA=";
        String saltDoBanco = "WeSfLm5SWhxqG1MeV0WBoQ=="; // Salt

        // A string completa como está no banco (salt:hash)
        String encodedPasswordNoBanco = saltDoBanco + ":" + hashDoBanco;


        // Senhas comuns
        String[] senhasCandidatas = {"abc123", "password123", "minhasenha", "frotas123"};

        System.out.println("Verificando senhas candidatas...");
        for (String senha : senhasCandidatas) {
            boolean match = encoder.matches(senha, encodedPasswordNoBanco);
            if (match) {
                System.out.println("=================================================");
                System.out.println("SUCESSO: A senha original para este hash é: " + senha);
                System.out.println("=================================================");
                return; // Encontrou a senha, pode parar
            } else {
                System.out.println("Tentativa falhou para senha: " + senha);
            }
        }
        System.out.println("Nenhuma das senhas candidatas gerou o hash correspondente.");
    }
}
