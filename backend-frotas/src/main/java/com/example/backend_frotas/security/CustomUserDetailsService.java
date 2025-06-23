package com.example.backend_frotas.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UsuarioRepository usuarioRepo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Usuario u = usuarioRepo.findByEmailAndAtivoTrue(email)
      .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    return new UsuarioDetails(u);
  }
}