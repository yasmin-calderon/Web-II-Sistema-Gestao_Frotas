package com.example.backend_frotas.model;

import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.enums.AgendamentoStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "agendamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Viagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(name = "destino", length = 100, nullable = false)
    private String destino;
    
    @Column(name = "justificativa", length = 255, nullable = false)
    private String justificativa;

    // Colunas de data/hora
    @Column(name = "data_hora_saida", nullable = false)
    private LocalDateTime dataHoraSaidaProgramada; // Mapeia para data_hora_saida

    @Column(name = "data_hora_retorno")
    private LocalDateTime dataHoraRetornoEfetiva; // Mapeia para data_hora_retorno

    // Colunas de quilometragem
    @Column(name = "quilometragem_saida", precision = 10, scale = 2)
    private BigDecimal quilometragemSaida;

    @Column(name = "quilometragem_final", precision = 10, scale = 2)
    private BigDecimal quilometragemFinal; // <-- MUDANÇA: Nome do campo ajustado

    // Colunas de observações
    @Column(name = "observacoes_saida", length = 255)
    private String observacoesSaida;

    @Column(name = "observacoes_final", length = 255)
    private String observacoesFinal; // <-- MUDANÇA: Nome do campo ajustado

    // Coluna de status
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20, nullable = false)
    private AgendamentoStatus status;
}
