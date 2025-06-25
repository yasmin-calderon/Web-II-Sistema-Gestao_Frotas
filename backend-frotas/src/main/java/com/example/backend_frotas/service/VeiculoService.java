package com.example.backend_frotas.service;

import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.enums.VeiculoStatus;
import com.example.backend_frotas.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Veiculo cadastrar(Veiculo veiculo) {
        veiculo.setAtivo(true);
        return veiculoRepository.save(veiculo);
    }

    public Veiculo editar(Long id, Veiculo veiculoAtualizado) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setPlaca(veiculoAtualizado.getPlaca());
        veiculo.setModelo(veiculoAtualizado.getModelo());
        veiculo.setTipo(veiculoAtualizado.getTipo());
        veiculo.setAno(veiculoAtualizado.getAno());
        veiculo.setQuilometragemAtual(veiculoAtualizado.getQuilometragemAtual());
        veiculo.setStatus(veiculoAtualizado.getStatus());
        return veiculoRepository.save(veiculo);
    }

    public void inativar(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setStatus(VeiculoStatus.INATIVO);
        veiculo.setAtivo(false);
        veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Optional<Veiculo> buscarPorId(Long id) {
        return veiculoRepository.findById(id);
    }
}