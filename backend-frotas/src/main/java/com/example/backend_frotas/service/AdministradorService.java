package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.CreateAdministradorDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.enums.PerfilUsuario;
import com.example.backend_frotas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criar(CreateAdministradorDto dto) {
        if (usuarioRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("Já existe um administrador com esse CPF.");
        }

        Usuario usuario = new Usuario();
        usuario.setCpf(dto.getCpf());
        usuario.setNomeCompleto(dto.getNomeCompleto());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());
        usuario.setCep(dto.getCep());
        usuario.setRua(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());
        usuario.setCidade(dto.getCidade());
        usuario.setEstado(dto.getEstado());
        usuario.setSenhaHash(dto.getSenha()); // Idealmente: criptografar
        usuario.setPerfil(PerfilUsuario.ADMINISTRADOR);
        usuario.setAtivo(true);

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findByPerfilAndAtivoTrue(PerfilUsuario.ADMINISTRADOR);
    }
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
    }
    public Usuario atualizar(Long id, CreateAdministradorDto dto) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
    
        usuario.setNomeCompleto(dto.getNomeCompleto());
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        usuario.setCep(dto.getCep());
        usuario.setRua(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());
        usuario.setCidade(dto.getCidade());
        usuario.setEstado(dto.getEstado());
        usuario.setEmail(dto.getEmail());
    
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            usuario.setSenhaHash(dto.getSenha()); // ou com encoder depois
        }
        
    
        return usuarioRepository.save(usuario);
    }
    
}
