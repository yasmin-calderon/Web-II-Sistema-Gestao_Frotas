package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.IniciarViagemRequestDto;
import com.example.backend_frotas.dto.FinalizarViagemRequestDto;
import com.example.backend_frotas.dto.ViagemDetalhesDto;
import com.example.backend_frotas.dto.ViagemHistoricoDto;
import com.example.backend_frotas.service.ViagemService;
import com.example.backend_frotas.security.UsuarioDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagens")
@RequiredArgsConstructor
public class ViagemController {

    private final ViagemService viagemService;

    @GetMapping("/motorista/meu-historico")
    @PreAuthorize("hasRole('MOTORISTA')")
    public ResponseEntity<List<ViagemHistoricoDto>> listarViagensDoMotorista(
            @AuthenticationPrincipal UsuarioDetails usuarioLogado
    ) {
        List<ViagemHistoricoDto> historico = viagemService.listarViagensPorMotorista(usuarioLogado.getId());
        return ResponseEntity.ok(historico);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MOTORISTA')")
    public ResponseEntity<ViagemDetalhesDto> obterDetalhesViagem(
            @PathVariable Long id,
            @AuthenticationPrincipal UsuarioDetails usuarioLogado
    ) {
        ViagemDetalhesDto detalhes = viagemService.obterDetalhesViagem(id, usuarioLogado.getId());
        return ResponseEntity.ok(detalhes);
    }

    @PostMapping("/{id}/iniciar")
    @PreAuthorize("hasRole('MOTORISTA')")
    public ResponseEntity<ViagemDetalhesDto> iniciarViagem(
            @PathVariable Long id,
            @Valid @RequestBody IniciarViagemRequestDto requestDTO,
            @AuthenticationPrincipal UsuarioDetails usuarioLogado) {
        ViagemDetalhesDto viagemAtualizada = viagemService.iniciarViagem(id, requestDTO, usuarioLogado.getId());
        return ResponseEntity.ok(viagemAtualizada);
    }

    @PostMapping("/{id}/finalizar")
    @PreAuthorize("hasRole('MOTORISTA')")
    public ResponseEntity<ViagemDetalhesDto> finalizarViagem(
            @PathVariable Long id,
            @Valid @RequestBody FinalizarViagemRequestDto requestDTO,
            @AuthenticationPrincipal UsuarioDetails usuarioLogado) {
                
        ViagemDetalhesDto viagemAtualizada = viagemService.finalizarViagem(id, requestDTO, usuarioLogado.getId());
        return ResponseEntity.ok(viagemAtualizada);
    }
}