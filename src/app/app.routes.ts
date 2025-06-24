import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';
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
import { IniciarViagemComponent } from './features/dashboard-motorista/iniciar-viagem/iniciar-viagem.component';
import { FinalizarViagemComponent } from './features/dashboard-motorista/finalizar-viagem/finalizar-viagem.component';
import { DetalhesViagemComponent } from './features/dashboard-motorista/detalhes-viagem/detalhes-viagem.component';
import { AdministradorFormComponent } from './features/administradores/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './features/administradores/administrador-list/administrador-list.component';
import { Forbidden403Component } from './shared/pages/forbidden403.component';
import { NotFound404Component } from './shared/pages/not-found404.component';

export const routes: Routes = [
  {
    path: '',
    //Descomentar quando o login estiver implementado
    redirectTo: 'login',
    pathMatch: 'full'
    // Remover quando o login estiver implementado
    // redirectTo: 'app/administradores',
    // pathMatch: 'full'
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
    canActivate: [AuthGuard], // Protege todas as rotas dentro de 'app'
    children: [
      // TODO: Precisa revisar todas as rotas após implementadas para fazer o mapeamento de permissões
      {
        path: 'forbidden',
        component: Forbidden403Component,
        canActivate: [AuthGuard],
      },
      // Rotas do Motorista
      {
        path: 'motorista',
        component: DashboardMotoristaComponent
      },
      {
        path: 'motorista/solicitar-ocorrencia',
        component: OcorrenciaFormComponent
      },
      {
        path: 'motorista/historico-viagens',
        component: HistoricoViagensComponent
      },
      {
        path: 'motorista/agendamento/:id/iniciar',
        component: IniciarViagemComponent
      },
      {
        path: 'motorista/agendamento/:id/finalizar',
        component: FinalizarViagemComponent
      },
      {
        path: 'motorista/agendamento/:id/detalhes',
        component: DetalhesViagemComponent
      },

      // Rotas de Motoristas (RF011)
      {
        path: 'motoristas',
        component: MotoristasListComponent
      },
      {
        path: 'motoristas/novo',
        component: MotoristaFormComponent,
        // canActivate: [AdminGuard] // Apenas administradores podem criar motoristas
      },
      {
        path: 'motoristas/editar/:cpf',
        component: MotoristaFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem editar motoristas
      },

      // Rotas do Administrador
      {
        path: 'administrador',
        component: DashboardAdministradorComponent,
        canActivate: [AdminGuard] // Apenas administradores podem acessar o dashboard do administrador
      },
      {
        path: 'administradores/novo',
        component: AdministradorFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem criar outros administradores
      },
      {
        path: 'administradores/editar/:id',
        component: AdministradorFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem editar outros administradores
      },
      {
        path: 'administradores',
        component: AdministradorListComponent,
        canActivate: [AdminGuard] // Apenas administradores podem acessar a lista de administradores
      },

      // Rotas de Veículos (RF010)
      {
        path: 'veiculos',
        component: VeiculosListComponent
      },
      {
        path: 'veiculos/novo',
        component: VeiculoFormComponent,
        // canActivate: [AdminGuard] // Apenas administradores podem criar veículos
      },
      {
        path: 'veiculos/editar/:id',
        component: VeiculoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem editar veículos
      },

      // Rotas de Agendamentos (RF009)
      {
        path: 'agendamentos',
        component: AgendamentosListComponent
      },
      {
        path: 'agendamentos/novo',
        component: AgendamentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem criar agendamentos
      },
      {
        path: 'agendamentos/editar/:id',
        component: AgendamentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem editar agendamentos
      },

      // Rotas de Abastecimentos (RF012)
      {
        path: 'abastecimentos/novo/:agendamentoId?',
        component: AbastecimentoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem criar abastecimentos
      },

      // Rotas de Manutenções (RF013)
      {
        path: 'manutencoes/novo/:veiculoId?',
        component: ManutencaoFormComponent,
        canActivate: [AdminGuard] // Apenas administradores podem criar manutenções
      },

      {
        path: '',
        redirectTo: 'administrador',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
