package com.example.backend_frotas.model;

import jakarta.persistence.*;
import java.time.LocalDate;

//@Entity
@Table(name = "manutencoes")
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    private LocalDate dataManutencao;

    @Enumerated(EnumType.STRING)
    private TipoManutencao tipo;

    private String descricao;
    private double valor;
    private double quilometragemManutencao;

    // Getters e Setters
    // (use Lombok se preferir, mas posso gerar esses métodos se quiser)
}
