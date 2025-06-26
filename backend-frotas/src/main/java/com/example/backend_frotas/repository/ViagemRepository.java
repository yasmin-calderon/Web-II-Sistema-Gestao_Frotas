package com.example.backend_frotas.repository;

import com.example.backend_frotas.model.Viagem;
import com.example.backend_frotas.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, Long> {
    List<Viagem> findByMotoristaOrderByDataHoraSaidaProgramadaDesc(Motorista motorista);

    Optional<Viagem> findByIdAndMotoristaId(Long viagemId, Long motoristaId);
}
