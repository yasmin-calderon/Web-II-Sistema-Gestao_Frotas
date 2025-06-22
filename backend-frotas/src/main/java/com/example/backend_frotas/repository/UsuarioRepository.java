package com.example.backend_frotas.repository;

import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.enums.PerfilUsuario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findByPerfilAndAtivoTrue(PerfilUsuario perfil);
    Optional<Usuario> findByCpfAndPerfilAndAtivoTrue(String cpf, PerfilUsuario perfil);
    boolean existsByCpf(String cpf);
}

