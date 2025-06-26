package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.CreateAdministradorDto;
import com.example.backend_frotas.dto.UpdateAdministradorDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.service.AdministradorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;


@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody @Valid CreateAdministradorDto dto) {
        return ResponseEntity.ok(administradorService.criar(dto));
    }

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(administradorService.listarTodos());
    }

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(administradorService.buscarPorId(id));
    }

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(
            @PathVariable Long id,@RequestBody @Valid UpdateAdministradorDto dto) {
        return ResponseEntity.ok(administradorService.atualizar(id, dto));
    }
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativarAdministrador(@PathVariable Long id, Authentication auth) {
        String emailLogado = auth.getName();
        administradorService.desativarAdministrador(id, emailLogado);
        return ResponseEntity.noContent().build();
    }
}

