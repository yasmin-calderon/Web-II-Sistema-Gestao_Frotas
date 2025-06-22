import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../services/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    private router: Router
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
      // Estamos em modo edição
      this.carregarAdministrador(this.idEditando);
      this.administradorForm.get('cpf')?.disable();
      this.administradorForm.get('senha')?.clearValidators(); // senha não obrigatória ao editar
      this.administradorForm.get('senha')?.updateValueAndValidity();
    }
  }

  carregarAdministrador(id: string) {
    this.administradorService.buscarPorId(id).subscribe({
      next: (admin) => {
        this.administradorForm.patchValue({
          ...admin,
          senha: '', // Não trazemos senha do backend
        });
      },
      error: (err) => {
        this.erroMensagem = 'Erro ao carregar administrador.';
        console.error(err);
      }
    });
  }

  get f() {
    return this.administradorForm.controls;
  }

  onSubmit() {
    this.enviado = true;

    // habilita o campo CPF se estiver desabilitado (só para pegar o valor)
    if (this.idEditando) {
      this.administradorForm.get('cpf')?.enable();
    }

    if (this.administradorForm.invalid) {
      this.erroMensagem = 'Preencha todos os campos obrigatórios corretamente.';
      this.sucessoMensagem = '';
      if (this.idEditando) this.administradorForm.get('cpf')?.disable();
      return;
    }

    const dadosParaEnviar = { ...this.administradorForm.getRawValue() };
    dadosParaEnviar.cpf = this.limparMascara(dadosParaEnviar.cpf ?? '');
    dadosParaEnviar.telefone = this.limparMascara(dadosParaEnviar.telefone);
    dadosParaEnviar.cep = this.limparMascara(dadosParaEnviar.cep);

    if (this.idEditando) {
      // Atualizar administrador
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
      // Criar novo administrador
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
