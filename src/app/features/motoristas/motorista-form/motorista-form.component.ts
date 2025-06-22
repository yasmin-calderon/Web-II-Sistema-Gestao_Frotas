import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotoristaService } from '../services/motorista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViaCepService } from '../../../shared/viacep.service';
import { EnderecoViaCep } from '../../../shared/viacep.model';

@Component({
  selector: 'app-motorista-form',
  standalone: true,
  templateUrl: './motorista-form.component.html',
  styleUrls: ['./motorista-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class MotoristaFormComponent implements OnInit {
  motoristaForm: FormGroup;
  enviado = false;
  sucessoMensagem = '';
  erroMensagem = '';
  cpfEditando: string | null = null; // Guarda o CPF para edição

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private route: ActivatedRoute,
    private router: Router,
    private viaCepService: ViaCepService
  ) {
    this.motoristaForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cnh: ['', Validators.required],
      validadeCnh: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
      telefone: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.minLength(6)]], // senha não é obrigatória na edição
    });
  }

  ngOnInit(): void {
    this.cpfEditando = this.route.snapshot.paramMap.get('cpf');
    console.log('CPF editando:', this.cpfEditando);
    if (this.cpfEditando) {
      this.carregarMotorista(this.cpfEditando);
      // Se estiver editando, desabilita o campo CPF e senha
      this.motoristaForm.get('cpf')?.disable();
      this.motoristaForm.get('senha')?.clearValidators();
      this.motoristaForm.get('senha')?.updateValueAndValidity();
    }
    //buscando o cep e o endereco automaticamente
    this.motoristaForm.get('cep')?.valueChanges.subscribe((cep: string) => {
      if (cep && cep.length === 8) {
        this.buscarEndereco(cep);
      }
    });    
  }
  buscarEndereco(cep: string) {
    this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
      next: (endereco: EnderecoViaCep) => {
        if (endereco.erro) {
          this.erroMensagem = 'CEP não encontrado.';
          return;
        }
        this.motoristaForm.patchValue({
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
          estado: endereco.uf,
        });
      },
      error: () => {
        this.erroMensagem = 'Erro ao buscar o endereço.';
      }
    });
  }
  

  carregarMotorista(cpf: string) {
    this.motoristaService.buscarPorCpf(cpf).subscribe({
      next: (motorista) => {
        console.log('Motorista carregado:', motorista); 
        const dataFormatada = this.converterDataParaPtBr(motorista.validadeCnh);
        this.motoristaForm.patchValue({
          ...motorista,
          validadeCnh: dataFormatada,
          senha: '', 
        });
      },
      error: (err) => {
        this.erroMensagem = 'Erro ao carregar dados do motorista.';
        console.error(err);
      },
    });
  }
  
  onSubmit() {
    this.enviado = true;

    // Se CPF está desabilitado, habilita temporariamente para pegar o valor
    if (this.cpfEditando) {
      this.motoristaForm.get('cpf')?.enable();
    }

    if (this.motoristaForm.invalid) {
      this.erroMensagem = 'Preencha todos os campos obrigatórios corretamente.';
      if (this.cpfEditando) this.motoristaForm.get('cpf')?.disable();
      return;
    }

    const dadosParaEnviar = { ...this.motoristaForm.getRawValue() }; // 

    // Se estiver editando, CPF não deve ser enviado pois é pela URL
    // if (this.cpfEditando) {
    //   delete dadosParaEnviar.cpf;
    // }
    if (this.cpfEditando && !dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
    }

    dadosParaEnviar.cpf = this.limparMascara(dadosParaEnviar.cpf ?? this.cpfEditando ?? '');
    dadosParaEnviar.telefone = this.limparMascara(dadosParaEnviar.telefone);
    dadosParaEnviar.cep = this.limparMascara(dadosParaEnviar.cep);
    dadosParaEnviar.validadeCnh = this.converterDataISO(dadosParaEnviar.validadeCnh);

    if (this.cpfEditando) {
      // Atualizar motorista
      this.motoristaService.atualizar(this.cpfEditando, dadosParaEnviar).subscribe({
        next: () => {
          this.sucessoMensagem = 'Motorista atualizado com sucesso!';
          this.erroMensagem = '';
          this.router.navigate(['/app/motoristas']);
        },
        error: (err) => {
          this.erroMensagem = 'Erro ao atualizar motorista. Tente novamente.';
          this.sucessoMensagem = '';
          console.error('Erro ao atualizar:', err);
        },
      });
    } else {
      // Criar motorista novo
      this.motoristaService.criar(dadosParaEnviar).subscribe({
        next: () => {
          this.sucessoMensagem = 'Motorista cadastrado com sucesso!';
          this.erroMensagem = '';
          this.motoristaForm.reset();
          this.enviado = false;
        },
        error: (err) => {
          this.erroMensagem = 'Erro ao cadastrar motorista. Tente novamente.';
          this.sucessoMensagem = '';
          console.error('Erro ao cadastrar:', err);
        },
      });
    }

    if (this.cpfEditando) this.motoristaForm.get('cpf')?.disable();
  }

  private limparMascara(valor: string): string {
    return valor?.replace(/\D/g, '') ?? '';
  }

  private converterDataISO(data: string): string {
    if (!data) return '';
    const partes = data.split('/');
    if (partes.length !== 3) return data;
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  private converterDataParaPtBr(dataIso: string): string {
    if (!dataIso) return '';
    const partes = dataIso.split('-');
    if (partes.length !== 3) return dataIso;
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }

  get f() {
    return this.motoristaForm.controls;
  }
}
