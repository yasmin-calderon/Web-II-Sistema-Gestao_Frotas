package com.example.backend_frotas.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class CustomSecurity {

    private final JwtUtil jwtUtil;

    public CustomSecurity(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean hasPerfil(Authentication authentication, String perfil) {
        if (authentication == null || !authentication.isAuthenticated()) return false;
        String token = authentication.getCredentials().toString();
        try {
            String claimPerfil = jwtUtil.extrairPerfil(token);
            return perfil.equals(claimPerfil);
        } catch (Exception e) {
            return false;
        }
    }
}