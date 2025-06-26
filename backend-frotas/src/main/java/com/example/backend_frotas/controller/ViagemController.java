package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.IniciarViagemRequestDto;
import com.example.backend_frotas.dto.FinalizarViagemRequestDto;
import com.example.backend_frotas.dto.ViagemDetalhesDto;
import com.example.backend_frotas.dto.ViagemHistoricoDto;
import com.example.backend_frotas.service.ViagemService; // Importa o serviço
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagens") // Mantém a URL base que definimos
@RequiredArgsConstructor
public class ViagemController {

    // MUDANÇA: Injeta o ViagemService, não o repositório.
    private final ViagemService viagemService;

    @GetMapping("/motorista/meu-historico")
    public ResponseEntity<List<ViagemHistoricoDto>> listarViagensDoMotorista() {
        Long motoristaIdAutenticado = 6L;
        return ResponseEntity.ok(viagemService.listarViagensPorMotorista(motoristaIdAutenticado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViagemDetalhesDto> obterDetalhesViagem(@PathVariable Long id) {
        // Devolve o DTO que o serviço preparou.
        return ResponseEntity.ok(viagemService.obterDetalhesViagem(id));
    }

    @PostMapping("/{id}/iniciar")
    public ResponseEntity<ViagemDetalhesDto> iniciarViagem(
            @PathVariable Long id,
            @Valid @RequestBody IniciarViagemRequestDto requestDTO) {
        // Devolve o DTO que o serviço preparou após a atualização.
        return ResponseEntity.ok(viagemService.iniciarViagem(id, requestDTO));
    }

    @PostMapping("/{id}/finalizar")
    public ResponseEntity<ViagemDetalhesDto> finalizarViagem(
            @PathVariable Long id,
            @Valid @RequestBody FinalizarViagemRequestDto requestDTO) {
        // Devolve o DTO que o serviço preparou após a atualização.
        return ResponseEntity.ok(viagemService.finalizarViagem(id, requestDTO));
    }
}