import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './core/auth/login/login.component';

import { DashboardMotoristaComponent } from './features/dashboard-motorista/dashboard-motorista.component';
import { HistoricoViagensComponent } from './features/dashboard-motorista/historico-viagens/historico-viagens.component';
import { IniciarViagemComponent } from './features/dashboard-motorista/iniciar-viagem/iniciar-viagem.component';
import { FinalizarViagemComponent } from './features/dashboard-motorista/finalizar-viagem/finalizar-viagem.component';
import { DetalhesViagemComponent } from './features/dashboard-motorista/detalhes-viagem/detalhes-viagem.component';

import { DashboardAdministradorComponent } from './features/dashboard-administrador/dashboard-administrador.component';
import { AdministradorListComponent } from './features/administradores/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './features/administradores/administrador-form/administrador-form.component';

import { VeiculosListComponent } from './features/veiculos/veiculos-list/veiculos-list.component';
import { VeiculoFormComponent } from './features/veiculos/veiculo-form/veiculo-form.component';

import { MotoristasListComponent } from './features/motoristas/motoristas-list/motoristas-list.component';
import { MotoristaFormComponent } from './features/motoristas/motorista-form/motorista-form.component';

import { AgendamentosListComponent } from './features/agendamentos/agendamentos-list/agendamentos-list.component';
import { AgendamentoFormComponent } from './features/agendamentos/agendamento-form/agendamento-form.component';

import { OcorrenciaFormComponent } from './features/ocorrencias/ocorrencia-form/ocorrencia-form.component';
import { AbastecimentoFormComponent } from './features/abastecimentos/abastecimento-form/abastecimento-form.component';
import { ManutencaoFormComponent } from './features/manutencoes/manutencao-form/manutencao-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LoginComponent,

    DashboardMotoristaComponent,
    HistoricoViagensComponent,
    IniciarViagemComponent,
    FinalizarViagemComponent,
    DetalhesViagemComponent,

    DashboardAdministradorComponent,
    AdministradorListComponent,
    AdministradorFormComponent,

    VeiculosListComponent,
    VeiculoFormComponent,

    MotoristasListComponent,
    MotoristaFormComponent,

    AgendamentosListComponent,
    AgendamentoFormComponent,

    OcorrenciaFormComponent,
    AbastecimentoFormComponent,
    ManutencaoFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }