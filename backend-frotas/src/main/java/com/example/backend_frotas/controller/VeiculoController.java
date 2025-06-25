package com.example.backend_frotas.controller;

import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PostMapping
    public ResponseEntity<Veiculo> cadastrar(@RequestBody Veiculo veiculo) {
        Veiculo novo = veiculoService.cadastrar(veiculo);
        return ResponseEntity.ok(novo);
    }

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> editar(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        Veiculo atualizado = veiculoService.editar(id, veiculo);
        return ResponseEntity.ok(atualizado);
    }

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        veiculoService.inativar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarTodos() {
        return ResponseEntity.ok(veiculoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        return veiculoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}