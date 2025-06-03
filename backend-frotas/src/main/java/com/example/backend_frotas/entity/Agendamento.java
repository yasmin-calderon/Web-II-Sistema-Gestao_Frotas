package com.example.backend_frotas.entity;

import com.example.backend_frotas.enums.AgendamentoStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
@Data
public class Agendamento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne // Muitos agendamentos para um veículo
  @JoinColumn(name = "veiculo_id", nullable = false) // Coluna da chave estrangeira
  private Veiculo veiculo;

  @ManyToOne // Muitos agendamentos para um motorista
  @JoinColumn(name = "motorista_id", nullable = false)
  private Usuario motorista; // Assumindo que Usuario pode ser Motorista ou Administrador

  @Column(name = "data_hora_saida", nullable = false)
  private LocalDateTime dataHoraSaida;

  @Column(name = "data_hora_retorno")
  private LocalDateTime dataHoraRetorno; // Pode ser null

  @Column(nullable = false, length = 100)
  private String destino;

  @Column(nullable = false, length = 255)
  private String justificativa;

  @Column(name = "quilometragem_saida", precision = 10, scale = 2)
  private BigDecimal quilometragemSaida;

  @Column(name = "quilometragem_final", precision = 10, scale = 2)
  private BigDecimal quilometragemFinal;

  @Column(name = "observacoes_saida", length = 255)
  private String observacoesSaida;

  @Column(name = "observacoes_final", length = 255)
  private String observacoesFinal;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AgendamentoStatus status;
}
