package com.example.backend_frotas.entity;

import com.example.backend_frotas.enums.ManutencaoTipo;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "manutencoes")
@Data
public class Manutencao {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "veiculo_id", nullable = false)
  private Veiculo veiculo;

  @Column(name = "data_manutencao", nullable = false)
  private LocalDateTime dataManutencao;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ManutencaoTipo tipo;

  @Column(nullable = false, length = 500)
  private String descricao;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal valor;

  @Column(name = "quilometragem_manutencao", nullable = false, precision = 10, scale = 2)
  private BigDecimal quilometragemManutencao;
}
