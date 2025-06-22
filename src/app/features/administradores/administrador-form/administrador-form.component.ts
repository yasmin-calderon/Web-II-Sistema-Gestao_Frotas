import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../services/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViaCepService } from '../../../shared/viacep.service';
import { EnderecoViaCep } from '../../../shared/viacep.model';

@Component({
  selector: 'app-administrador-form',
  standalone: true,
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class AdministradorFormComponent implements OnInit {
  administradorForm: FormGroup;
  enviado = false;
  sucessoMensagem = '';
  erroMensagem = '';
  idEditando: string | null = null;

  constructor(
    private fb: FormBuilder,
    private administradorService: AdministradorService,
    private route: ActivatedRoute,
    private router: Router,
    private viaCepService: ViaCepService
  ) {
    this.administradorForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nomeCompleto: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.idEditando = this.route.snapshot.paramMap.get('id');

    if (this.idEditando) {
      this.carregarAdministrador(this.idEditando);
      this.administradorForm.get('cpf')?.disable();
      this.administradorForm.get('senha')?.clearValidators();
      this.administradorForm.get('senha')?.updateValueAndValidity();
    }
    //buscando o cep e o endereco automaticamente
    this.administradorForm.get('cep')?.valueChanges.subscribe((cep: string) => {
      if (cep && cep.length === 8) {
        this.buscarEndereco(cep);
      }
    });
  }

  buscarEndereco(cep: string) {
    this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
      next: (endereco: EnderecoViaCep) => {
        if ((endereco as any).erro) {
          this.erroMensagem = 'CEP não encontrado.';
          return;
        }

        this.administradorForm.patchValue({
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

  carregarAdministrador(id: string) {
    this.administradorService.buscarPorId(id).subscribe({
      next: (admin) => {
        this.administradorForm.patchValue({
          ...admin,
          senha: '', // senha não vem preenchida 
        });
      },
      error: (err) => {
        this.erroMensagem = 'Erro ao carregar cadastro do administrador.';
        console.error(err);
      }
    });
  }

  get f() {
    return this.administradorForm.controls;
  }

  onSubmit() {
    this.enviado = true;

    if (this.idEditando) {
      this.administradorForm.get('cpf')?.enable();
    }

    if (this.administradorForm.invalid) {
      this.erroMensagem = 'Preencha todos os campos obrigatórios corretamente.';
      this.sucessoMensagem = '';
      if (this.idEditando) this.administradorForm.get('cpf')?.disable();
      return;
    }

    let dadosParaEnviar = { ...this.administradorForm.getRawValue() };
    dadosParaEnviar.cpf = this.limparMascara(dadosParaEnviar.cpf ?? '');
    dadosParaEnviar.telefone = this.limparMascara(dadosParaEnviar.telefone);
    dadosParaEnviar.cep = this.limparMascara(dadosParaEnviar.cep);

    if (this.idEditando && !dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
    }

    if (this.idEditando) {
      this.administradorService.atualizarAdministrador(this.idEditando, dadosParaEnviar).subscribe({
        next: () => {
          this.sucessoMensagem = 'Administrador atualizado com sucesso!';
          this.erroMensagem = '';
          this.router.navigate(['/app/administradores']);
        },
        error: (err) => {
          this.erroMensagem = 'Erro ao atualizar administrador.';
          this.sucessoMensagem = '';
          console.error(err);
        }
      });
    } else {
      this.administradorService.criarAdministrador(dadosParaEnviar).subscribe({
        next: () => {
          this.sucessoMensagem = 'Administrador cadastrado com sucesso!';
          this.erroMensagem = '';
          this.administradorForm.reset();
          this.enviado = false;
        },
        error: (err) => {
          this.erroMensagem = 'Erro ao cadastrar administrador.';
          this.sucessoMensagem = '';
          console.error(err);
        }
      });
    }

    if (this.idEditando) this.administradorForm.get('cpf')?.disable();
  }

  private limparMascara(valor: string): string {
    return valor?.replace(/\D/g, '') ?? '';
  }
}
