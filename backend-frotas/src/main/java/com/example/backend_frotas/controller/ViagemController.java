package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.IniciarViagemRequestDto;
import com.example.backend_frotas.dto.FinalizarViagemRequestDto;
import com.example.backend_frotas.dto.ViagemDetalhesDto;
import com.example.backend_frotas.dto.ViagemHistoricoDto;
import com.example.backend_frotas.service.ViagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagens")
@RequiredArgsConstructor
public class ViagemController {

    private final ViagemService viagemService;

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'MOTORISTA')")
    @GetMapping("/motorista/meu-historico")
    public ResponseEntity<List<ViagemHistoricoDto>> listarViagensDoMotorista() {
        Long motoristaIdAutenticado = 6L; //Placeholder teste, será trocado por uma autenticação
        return ResponseEntity.ok(viagemService.listarViagensPorMotorista(motoristaIdAutenticado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViagemDetalhesDto> obterDetalhesViagem(@PathVariable Long id) {
        return ResponseEntity.ok(viagemService.obterDetalhesViagem(id));
    }

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'MOTORISTA')")    
    @PostMapping("/{id}/iniciar")
    public ResponseEntity<ViagemDetalhesDto> iniciarViagem(
            @PathVariable Long id,
            @Valid @RequestBody IniciarViagemRequestDto requestDTO) {
        return ResponseEntity.ok(viagemService.iniciarViagem(id, requestDTO));
    }

    //@PreAuthorize("@customSecurity.hasPerfil(authentication, 'MOTORISTA')")
    @PostMapping("/{id}/finalizar")
    public ResponseEntity<ViagemDetalhesDto> finalizarViagem(
            @PathVariable Long id,
            @Valid @RequestBody FinalizarViagemRequestDto requestDTO) {
        return ResponseEntity.ok(viagemService.finalizarViagem(id, requestDTO));
    }
}