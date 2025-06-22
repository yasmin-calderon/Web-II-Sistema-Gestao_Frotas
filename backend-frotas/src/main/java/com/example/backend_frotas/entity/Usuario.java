package com.example.backend_frotas.entity;

import com.example.backend_frotas.enums.PerfilUsuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data; // Anotação Lombok para getters, setters, etc.
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "usuarios")

@Data // Adiciona getters, setters, equals, hashCode, toString
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // @OneToMany(mappedBy = "motorista", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // mappedBy = "motorista": indica que a propriedade 'motorista' na entidade Agendamento é que faz o mapeamento
  // cascade = CascadeType.ALL: Operações como salvar/deletar em Usuario podem cascatear para Agendamentos (use com cautela)
  // fetch = FetchType.LAZY: Carrega os agendamentos apenas quando acessados (melhor para performance)
  @OneToMany(mappedBy = "motorista")
  @JsonManagedReference
  private List<Agendamento> agendamentos;

  // @OneToMany(mappedBy = "motorista", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @OneToMany(mappedBy = "motorista")
  @JsonManagedReference
  private List<Ocorrencia> ocorrencias;

  // @OneToMany(mappedBy = "motorista", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @OneToMany(mappedBy = "motorista")
  @JsonManagedReference
  private List<Abastecimento> abastecimentos;

  @Column(name = "nome_completo", nullable = false, length = 100)
  private String nomeCompleto;

  @Column(nullable = false, unique = true, length = 11)
  private String cpf;

  @Column(nullable = false, unique = true, length = 100)
  private String email;

  @Column(name = "senha_hash", nullable = false)
  private String senhaHash; // RF041: Armazena o hash da senha

  @Enumerated(EnumType.STRING) // Persiste o enum como String no banco
  @Column(nullable = false)
  private PerfilUsuario perfil;

  @Column(length = 20)
  private String telefone;

  // Endereço (RF026, RF044) - sem normalizar cidade/estado
  @Column(length = 9)
  private String cep;
  @Column(length = 100)
  private String rua;
  @Column(length = 10)
  private String numero;
  @Column(length = 100)
  private String bairro;
  @Column(length = 100)
  private String cidade;
  @Column(length = 2)
  private String estado;
  @Column(length = 100)
  private String complemento;

  // Campos específicos de Motorista (RF026)
  @Column(length = 15, unique = true) // CNH pode ser NULL, mas se preenchida, é única
  private String cnh;
  @Column(name = "validade_cnh")
  private LocalDate validadeCnh;

  // Para desativação lógica (RF050)
  @Column(nullable = false)
  private Boolean ativo = true;
}
