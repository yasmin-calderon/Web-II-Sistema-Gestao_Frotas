package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.IniciarViagemRequestDto;
import com.example.backend_frotas.dto.FinalizarViagemRequestDto;
import com.example.backend_frotas.dto.ViagemDetalhesDto;
import com.example.backend_frotas.dto.ViagemHistoricoDto;

import java.util.List;

public interface ViagemService {
    List<ViagemHistoricoDto> listarViagensPorMotorista(Long motoristaId);
    ViagemDetalhesDto obterDetalhesViagem(Long id, Long motoristaIdAutenticado);
    ViagemDetalhesDto iniciarViagem(Long viagemId, IniciarViagemRequestDto requestDTO, Long motoristaIdAutenticado);
    ViagemDetalhesDto finalizarViagem(Long viagemId, FinalizarViagemRequestDto requestDTO, Long motoristaIdAutenticado);
}
