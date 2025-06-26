package com.example.backend_frotas.service;

import com.example.backend_frotas.entity.Manutencao;
import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.enums.VeiculoStatus;
import com.example.backend_frotas.repository.ManutencaoRepository;
import com.example.backend_frotas.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ManutencaoService {

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Manutencao registrarManutencao(Manutencao manutencao) {
        Optional<Veiculo> optVeiculo = veiculoRepository.findById(manutencao.getVeiculo().getId());

        if (optVeiculo.isPresent()) {
        Veiculo veiculo = optVeiculo.get();
        veiculo.setStatus(VeiculoStatus.EM_MANUTENCAO);
        //veiculo.setQuilometragemAtual(BigDecimal.valueOf(manutencao.getQuilometragemManutencao()));
        veiculo.setQuilometragemAtual(manutencao.getQuilometragemManutencao());
        veiculoRepository.save(veiculo);
        }

        return manutencaoRepository.save(manutencao);
    }
}
