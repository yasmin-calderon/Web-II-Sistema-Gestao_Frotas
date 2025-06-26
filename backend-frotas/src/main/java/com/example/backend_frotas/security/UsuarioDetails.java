package com.example.backend_frotas.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.enums.PerfilUsuario;

/**
 * Extensão de UserDetails que encapsula o perfil do usuário.
 */
public class UsuarioDetails extends User {
    private static final long serialVersionUID = 1L;

    private final PerfilUsuario perfil;

    /**
     * Constrói um UsuarioDetails a partir da entidade Usuario.
     * @param usuario a entidade de domínio contendo e-mail, senha e perfil
     */
    public UsuarioDetails(Usuario usuario) {
        super(
            usuario.getEmail(),
            usuario.getSenhaHash(),
            List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getPerfil().name()))
        );
        this.perfil = usuario.getPerfil();
    }
    

    /**
     * Retorna o perfil do usuário (MOTORISTA ou ADMINISTRADOR).
     */
    public PerfilUsuario getPerfil() {
        return perfil;
    }
}