import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';
import { MotoristaGuard } from './core/auth/motorista.guard';
import { LoginComponent } from './core/auth/login/login-form/login.component';

// Importar todos os componentes das features diretamente
import { DashboardMotoristaComponent } from './features/dashboard-motorista/dashboard-motorista.component';
import { DashboardAdministradorComponent } from './features/dashboard-administrador/dashboard-administrador.component';
import { VeiculosListComponent } from './features/veiculos/veiculos-list/veiculos-list.component';
import { VeiculoFormComponent } from './features/veiculos/veiculo-form/veiculo-form.component';
import { MotoristasListComponent } from './features/motoristas/motoristas-list/motoristas-list.component';
import { MotoristaFormComponent } from './features/motoristas/motorista-form/motorista-form.component';
import { AgendamentosListComponent } from './features/agendamentos/agendamentos-list/agendamentos-list.component';
import { AgendamentoFormComponent } from './features/agendamentos/agendamento-form/agendamento-form.component';
import { OcorrenciaFormComponent } from './features/ocorrencias/ocorrencia-form/ocorrencia-form.component';
import { AbastecimentoFormComponent } from'./features/abastecimentos/abastecimento-form/abastecimento-form.component';
import { ManutencaoFormComponent } from './features/manutencoes/manutencao-form/manutencao-form.component';
import { HistoricoViagensComponent } from './features/dashboard-motorista/historico-viagens/historico-viagens.component';
import { DetalhesViagemComponent } from './features/dashboard-motorista/detalhes-viagem/detalhes-viagem.component';
import { AdministradorFormComponent } from './features/administradores/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './features/administradores/administrador-list/administrador-list.component';
import { Forbidden403Component } from './shared/pages/forbidden403.component';
import { NotFound404Component } from './shared/pages/not-found404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Já direcionando como login como padrão
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFound404Component,
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Guarda de autenticação para entrar no sistema
    children: [
      {
        path: 'forbidden',
        component: Forbidden403Component,
      },
      
      {
        path: 'motorista',
        component: DashboardMotoristaComponent,
        canActivate: [MotoristaGuard] // Apenas motoristas
      },
      {
        path: 'motorista/solicitar-ocorrencia',
        component: OcorrenciaFormComponent,
        canActivate: [MotoristaGuard] // Apenas motoristas
      },
      {
        path: 'motorista/historico-viagens',
        component: HistoricoViagensComponent,
        canActivate: [MotoristaGuard] // Apenas motoristas
      },
      {
        path: 'motorista/agendamento/:id/detalhes',
        component: DetalhesViagemComponent,
        canActivate: [MotoristaGuard] // Apenas motoristas
      },
      {
        path: 'administrador',
        component: DashboardAdministradorComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'motoristas',
        component: MotoristasListComponent,
        canActivate: [AdminGuard] // Apenas administradores
      }, 
      {
        path: 'motoristas/novo',
        component: MotoristaFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'motoristas/editar/:cpf',
        component: MotoristaFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'administradores',
        component: AdministradorListComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'administradores/novo',
        component: AdministradorFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'administradores/editar/:id',
        component: AdministradorFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'veiculos',
        component: VeiculosListComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'veiculos/novo',
        component: VeiculoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'veiculos/editar/:id',
        component: VeiculoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'agendamentos',
        component: AgendamentosListComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'agendamentos/novo',
        component: AgendamentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'agendamentos/editar/:id',
        component: AgendamentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'abastecimentos/novo/:agendamentoId?',
        component: AbastecimentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: 'manutencoes/novo/:veiculoId?',
        component: ManutencaoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores
      },
      {
        path: '',
        redirectTo: 'motorista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];