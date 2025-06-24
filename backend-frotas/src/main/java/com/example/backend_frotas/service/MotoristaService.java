package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.CreateMotoristaDto;
import com.example.backend_frotas.dto.MotoristaResponseDto;
import com.example.backend_frotas.dto.UpdateMotoristaDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.enums.PerfilUsuario;
import com.example.backend_frotas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotoristaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario criar(CreateMotoristaDto dto) {
        if (usuarioRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("Já existe um motorista com esse CPF.");
        }

        Usuario motorista = new Usuario();
        motorista.setNomeCompleto(dto.getNomeCompleto());
        motorista.setCpf(dto.getCpf());
        motorista.setCnh(dto.getCnh());
        motorista.setValidadeCnh(dto.getValidadeCnh());
        motorista.setTelefone(dto.getTelefone());
        motorista.setCep(dto.getCep());
        motorista.setRua(dto.getLogradouro());
        motorista.setBairro(dto.getBairro());
        motorista.setCidade(dto.getCidade());
        motorista.setEstado(dto.getEstado());
        motorista.setEmail(dto.getEmail());
        motorista.setSenhaHash(passwordEncoder.encode(dto.getSenha()));

        motorista.setPerfil(PerfilUsuario.MOTORISTA);
        motorista.setAtivo(true);

        return usuarioRepository.save(motorista);
    }

    public List<MotoristaResponseDto> listarTodos() {
        return usuarioRepository.findByPerfilAndAtivoTrue(PerfilUsuario.MOTORISTA)
            .stream()
            .map(usuario -> {
                MotoristaResponseDto dto = new MotoristaResponseDto();
                dto.setId(usuario.getId());
                dto.setNomeCompleto(usuario.getNomeCompleto());
                dto.setCpf(usuario.getCpf());
                dto.setEmail(usuario.getEmail());
                dto.setTelefone(usuario.getTelefone());
                return dto;
            })
            .toList();
    }
    

    public Usuario atualizar(String cpf, UpdateMotoristaDto dto) {
        Optional<Usuario> optional = usuarioRepository.findByCpfAndPerfilAndAtivoTrue(cpf, PerfilUsuario.MOTORISTA);
        if (optional.isEmpty()) {
            throw new RuntimeException("Motorista não encontrado.");
        }
    
        Usuario motorista = optional.get();
    
        motorista.setNomeCompleto(dto.getNomeCompleto());
        motorista.setTelefone(dto.getTelefone());
        motorista.setEmail(dto.getEmail());
    
        return usuarioRepository.save(motorista);
    }
    
    public void desativar(String cpf) {
        Optional<Usuario> optional = usuarioRepository.findByCpfAndPerfilAndAtivoTrue(cpf, PerfilUsuario.MOTORISTA);
        if (optional.isPresent()) {
            Usuario motorista = optional.get();
            motorista.setAtivo(false);
            usuarioRepository.save(motorista);
        } else {
            throw new RuntimeException("Não foi possível encontrar o motorista em base de dados.");
        }
    }

    public Usuario buscarPorCpf(String cpf) {
        return usuarioRepository.findByCpfAndPerfilAndAtivoTrue(cpf, PerfilUsuario.MOTORISTA)
            .orElseThrow(() -> new RuntimeException("Motorista com CPF " + cpf + " não encontrado ou está desativado."));
    }
}
