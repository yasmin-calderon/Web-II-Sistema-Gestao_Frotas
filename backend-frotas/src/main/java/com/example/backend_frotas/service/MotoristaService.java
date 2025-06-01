package com.example.backend_frotas.service;
import com.example.backend_frotas.dto.CreateMotoristaDto;
import com.example.backend_frotas.dto.UpdateMotoristaDto;
import com.example.backend_frotas.model.Motorista;
import com.example.backend_frotas.repository.MotoristaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotoristaService {

    @Autowired
    private MotoristaRepository motoristaRepository;

    public Motorista criar(CreateMotoristaDto dto) {
        Motorista motorista = new Motorista();

        motorista.setNomeCompleto(dto.getNomeCompleto());
        motorista.setCpf(dto.getCpf());
        motorista.setCnh(dto.getCnh());
        motorista.setValidadeCnh(dto.getValidadeCnh());
        motorista.setTelefone(dto.getTelefone());
        motorista.setCep(dto.getCep());
        motorista.setLogradouro(dto.getLogradouro());
        motorista.setBairro(dto.getBairro());
        motorista.setCidade(dto.getCidade());
        motorista.setEstado(dto.getEstado());
        motorista.setEmail(dto.getEmail());

        ///aqui tem que implementar a parte da criptografia da senha
        motorista.setSenha(dto.getSenha());

        motorista.setAtivo(true); ///aqui o campo pra controlar o status do motorista 

        return motoristaRepository.save(motorista);
    }

    public List<Motorista> listarTodos() {
        return motoristaRepository.findAllByAtivoTrue();
    }

    public Motorista atualizar(String cpf, UpdateMotoristaDto dto) {
        Optional<Motorista> optional = motoristaRepository.findByCpfAndAtivoTrue(cpf);
        if (optional.isEmpty()) {
            throw new RuntimeException("Não foi possível encontrar o motorista em base de dados.");
        }

        Motorista motorista = optional.get();

        motorista.setNomeCompleto(dto.getNomeCompleto());
        motorista.setTelefone(dto.getTelefone());
        motorista.setEmail(dto.getEmail());

        return motoristaRepository.save(motorista);
    }

    public void desativar(String cpf) {
        Optional<Motorista> optional = motoristaRepository.findByCpfAndAtivoTrue(cpf);
        if (optional.isPresent()) {
            Motorista motorista = optional.get();
            motorista.setAtivo(false);
            motoristaRepository.save(motorista);
        } else {
            throw new RuntimeException("Não foi possível encontrar o motorista em base de dados.");
        }
    }
}
