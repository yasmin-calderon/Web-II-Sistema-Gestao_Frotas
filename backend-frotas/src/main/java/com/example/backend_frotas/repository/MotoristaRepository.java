package com.example.backend_frotas.repository;

import com.example.backend_frotas.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Long> {

    //verificando se ja existe um cadastro com aqeuel cpf
    Optional<Motorista> findByCpf(String cpf);
    //verificando se ja existe cadastro com mesmo email
    Optional<Motorista> findByEmail(String email);

    List<Motorista> findAllByAtivoTrue();

    Optional<Motorista> findByCpfAndAtivoTrue(String cpf);
}
