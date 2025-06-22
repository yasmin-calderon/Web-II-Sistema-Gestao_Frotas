package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.CreateAdministradorDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.service.AdministradorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/administradores")
@CrossOrigin(origins = "http://localhost:4200")  // Libera CORS para o frontend Angular
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody @Valid CreateAdministradorDto dto) {
        return ResponseEntity.ok(administradorService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(administradorService.listarTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(administradorService.buscarPorId(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody @Valid CreateAdministradorDto dto) {
    return ResponseEntity.ok(administradorService.atualizar(id, dto));
}
}
