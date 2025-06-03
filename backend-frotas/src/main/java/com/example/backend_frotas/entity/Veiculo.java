package com.example.backend_frotas.entity;

import java.math.BigDecimal;
import java.util.List;

import com.example.backend_frotas.enums.VeiculoStatus;
import com.example.backend_frotas.enums.VeiculoTipo;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "veiculos")
@Data
public class Veiculo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Agendamento> agendamentos;

  @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Ocorrencia> ocorrencias;

  @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Abastecimento> abastecimentos;

  @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Manutencao> manutencoes;

  @Column(nullable = false, unique = true, length = 7)
  private String placa;

  @Column(nullable = false, length = 50)
  private String modelo;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private VeiculoTipo tipo;

  @Column(nullable = false)
  private Integer ano;

  @Column(name = "quilometragem_atual", nullable = false, precision = 10, scale = 2)
  private BigDecimal quilometragemAtual;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private VeiculoStatus status;

  @Column(nullable = false)
  private Boolean ativo = true;
}
