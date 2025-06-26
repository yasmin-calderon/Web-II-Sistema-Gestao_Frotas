package com.example.backend_frotas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend_frotas.entity.Manutencao;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
}
