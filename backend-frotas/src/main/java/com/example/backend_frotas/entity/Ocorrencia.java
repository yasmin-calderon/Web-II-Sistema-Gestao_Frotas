package com.example.backend_frotas.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "ocorrencias")
@Data
public class Ocorrencia {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "veiculo_id", nullable = false)
  private Veiculo veiculo;

  // @ManyToOne
  // @JoinColumn(name = "motorista_id", nullable = false)
  @ManyToOne
  @JoinColumn(name = "motorista_id")
  @JsonBackReference
  private Usuario motorista;

  @Column(name = "data_registro", nullable = false)
  private LocalDateTime dataRegistro;

  @Column(name = "descricao_problema", nullable = false, length = 500)
  private String descricaoProblema;

  @Column(nullable = false)
  private Boolean resolvida = false; // Administrador pode marcar como resolvida
}
