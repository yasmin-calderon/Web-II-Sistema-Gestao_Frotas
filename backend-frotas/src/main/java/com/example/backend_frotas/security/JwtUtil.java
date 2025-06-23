package com.example.backend_frotas.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.expiration}")
  private long expirationMs;

  public String gerarToken(UserDetails userDetails) {
    return Jwts.builder()
      .setSubject(userDetails.getUsername())
      .claim("perfil", ((UsuarioDetails)userDetails).getPerfil().name())
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
      .signWith(SignatureAlgorithm.HS512, secretKey)
      .compact();
  }

  public String extrairEmail(String token) {
    return Jwts.parser().setSigningKey(secretKey)
      .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validarToken(String token, UserDetails userDetails) {
    final String email = extrairEmail(token);
    return email.equals(userDetails.getUsername()) && 
           !Jwts.parser().setSigningKey(secretKey)
                 .parseClaimsJws(token).getBody().getExpiration().before(new Date());
  }
}