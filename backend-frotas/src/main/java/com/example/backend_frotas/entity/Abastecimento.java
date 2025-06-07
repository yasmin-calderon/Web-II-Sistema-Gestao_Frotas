package com.example.backend_frotas.entity;

import com.example.backend_frotas.enums.TipoCombustivel;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "abastecimentos")
@Data
public class Abastecimento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "veiculo_id", nullable = false)
  private Veiculo veiculo;

  @ManyToOne
  @JoinColumn(name = "motorista_id", nullable = false)
  private Usuario motorista;

  @Column(name = "data_abastecimento", nullable = false)
  private LocalDateTime dataAbastecimento;

  @Enumerated(EnumType.STRING)
  @Column(name = "tipo_combustivel", nullable = false)
  private TipoCombustivel tipoCombustivel;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal valor;

  @Column(name = "quilometragem_abastecimento", nullable = false, precision = 10, scale = 2)
  private BigDecimal quilometragemAbastecimento;
}
