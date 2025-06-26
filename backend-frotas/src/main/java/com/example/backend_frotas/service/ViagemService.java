package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.IniciarViagemRequestDto;
import com.example.backend_frotas.dto.FinalizarViagemRequestDto;
import com.example.backend_frotas.dto.ViagemDetalhesDto;
import com.example.backend_frotas.dto.ViagemHistoricoDto;

import java.util.List;

public interface ViagemService {
    List<ViagemHistoricoDto> listarViagensPorMotorista(Long motoristaId);
    ViagemDetalhesDto obterDetalhesViagem(Long id);
    ViagemDetalhesDto iniciarViagem(Long id, IniciarViagemRequestDto requestDTO);
    ViagemDetalhesDto finalizarViagem(Long id, FinalizarViagemRequestDto requestDTO);
}
