import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAgentComponent} from 'src/app/components/agent/add-agent/add-agent.component'
import { UpdateAdminComponent} from 'src/app/components/update-admin/update-admin.component'
import { AddAgencyComponent } from './components/agency/add-agency/add-agency.component';
import { InfoAgencyComponent } from './components/agency/info-agency/info-agency.component';
import { ListAgencyComponent } from './components/agency/list-agency/list-agency.component';
import { ListAgentComponent } from './components/agent/list-agent/list-agent.component';
import { UpdateAgentComponent } from './components/agent/update-agent/update-agent.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ComptesComponent } from './components/clients/comptes/comptes.component';
import { AuthorisationGuard } from './guards/authorisation.guard';

const routes: Routes = [
  { path:'agences', canActivate: [ AuthorisationGuard ] , component: ListAgencyComponent },
  { path:'agences/:id', canActivate: [ AuthorisationGuard ] , component: InfoAgencyComponent },
  { path:'agences/:idAgence/agents/:idAgent', canActivate: [ AuthorisationGuard ] , component: UpdateAgentComponent },
  { path:'agents/:id_agence', canActivate: [ AuthorisationGuard ], component: ListAgentComponent },
  { path:'agents/:id_agence/:idAgent/clients', canActivate: [ AuthorisationGuard ], component: ClientsComponent },
  { path:'add_agent', canActivate: [ AuthorisationGuard ],component : AddAgentComponent },
  { path:'update_admin', canActivate: [ AuthorisationGuard ],component : UpdateAdminComponent },
  { path:'agents/:id_agence/:idAgent/client/:idClient', canActivate: [ AuthorisationGuard ],component : ComptesComponent },
  {path:'add_agence',canActivate: [ AuthorisationGuard ],component : AddAgencyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
