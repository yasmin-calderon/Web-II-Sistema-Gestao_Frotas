package com.example.backend_frotas.repository;

import com.example.backend_frotas.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByMotoristaId(Long motoristaId);
}
