package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.CreateOcorrenciaDto;
import com.example.backend_frotas.dto.OcorrenciaResponseDto;
import com.example.backend_frotas.service.OcorrenciaService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
@RequiredArgsConstructor
public class OcorrenciaController {

    private final OcorrenciaService ocorrenciaService;

    @PostMapping
    public OcorrenciaResponseDto registrar(@RequestBody CreateOcorrenciaDto dto) {
        return ocorrenciaService.registrar(dto);
    }

    @GetMapping
    public List<OcorrenciaResponseDto> listar() {
        return ocorrenciaService.listarTodas();
    }
}
