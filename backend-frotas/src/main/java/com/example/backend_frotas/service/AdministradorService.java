package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.CreateAdministradorDto;
import com.example.backend_frotas.dto.UpdateAdministradorDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.enums.PerfilUsuario;
import com.example.backend_frotas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class AdministradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        usuario.setSenhaHash(passwordEncoder.encode(dto.getSenha())); // Idealmente: criptografar
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
            usuario.setSenhaHash(passwordEncoder.encode(dto.getSenha())); //adicionar encoder depois?
        }
        return usuarioRepository.save(usuario);
    }
    public Usuario atualizar(Long id, UpdateAdministradorDto dto) {
        Usuario admin = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));

        admin.setNomeCompleto(dto.getNomeCompleto());
        admin.setTelefone(dto.getTelefone());
        admin.setEmail(dto.getEmail());

        return usuarioRepository.save(admin);
    }
    public void desativarAdministrador(Long id, String emailLogado) {
        Usuario admin = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Administrador não encontrado."));
    
        if (!admin.getPerfil().equals(PerfilUsuario.ADMINISTRADOR)) {
            throw new RuntimeException("O usuário informado não é um administrador.");
        }
    
        if (admin.getEmail().equals(emailLogado)) {
            throw new RuntimeException("Você não pode deletar a si mesmo.");
        }
        admin.setAtivo(false);
        usuarioRepository.save(admin);
    }
    
}
