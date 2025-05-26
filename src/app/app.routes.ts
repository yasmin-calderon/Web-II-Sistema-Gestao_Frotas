import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';

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


export const routes: Routes = [
  {
    path: '',
    //Descomentar quando o login estiver implementado
    // redirectTo: 'login',
    // pathMatch: 'full'
    // Remover quando o login estiver implementado
    redirectTo: 'app/administrador',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    // Comentar ou ajustar AuthGuard se o login não estiver pronto
    // canActivate: [AuthGuard],
    children: [
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

      // Rotas do Administrador
      {
        path: 'administrador',
        component: DashboardAdministradorComponent
      },

      // Rotas de Veículos (RF010)
      {
        path: 'veiculos',
        component: VeiculosListComponent
      },
      {
        path: 'veiculos/novo',
        component: VeiculoFormComponent
      },
      {
        path: 'veiculos/editar/:id',
        component: VeiculoFormComponent
      },

      // Rotas de Motoristas (RF011)
      {
        path: 'motoristas',
        component: MotoristasListComponent
      },
      {
        path: 'motoristas/novo',
        component: MotoristaFormComponent
      },
      {
        path: 'motoristas/editar/:id',
        component: MotoristaFormComponent
      },

      // Rotas de Agendamentos (RF009)
      {
        path: 'agendamentos',
        component: AgendamentosListComponent
      },
      {
        path: 'agendamentos/novo',
        component: AgendamentoFormComponent
      },
      {
        path: 'agendamentos/editar/:id',
        component: AgendamentoFormComponent
      },

      // Rotas de Abastecimentos (RF012)
      {
        path: 'abastecimentos/novo/:agendamentoId?',
        component: AbastecimentoFormComponent
      },

      // Rotas de Manutenções (RF013)
      {
        path: 'manutencoes/novo/:veiculoId?',
        component: ManutencaoFormComponent
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
    redirectTo: 'login'
  }
];
