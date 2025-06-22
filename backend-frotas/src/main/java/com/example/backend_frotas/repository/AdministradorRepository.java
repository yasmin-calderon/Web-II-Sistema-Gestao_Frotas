package com.example.backend_frotas.repository;

import com.example.backend_frotas.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface AdministradorRepository extends JpaRepository<Administrador, String> {

    Optional<Administrador> findByCpfAndAtivoTrue(String cpf);

    List<Administrador> findAllByAtivoTrue();
}
