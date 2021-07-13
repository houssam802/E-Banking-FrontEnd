import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {ProfilComponent} from './compte/profil/profil.component';
import {DashboardPrincpComponent} from './dashboard/dashboard-princp/dashboard-princp.component';
import { LoginGuard } from './guard/login.guard';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { PrincipalComponent } from './virement/principal/principal.component'
import { VosvirementComponent } from './virement/vosvirement/vosvirement.component';
import { NavMatComponent } from './Menu/nav-mat/nav-mat.component';


const routes: Routes = [
  { path:'', component : NavMatComponent},
  { path:'profile',canActivate: [ LoginGuard ], component : ProfilComponent},
  { path:'dashboard', canActivate: [ LoginGuard ],component : DashboardPrincpComponent },
  { path:'addVirement', canActivate: [ LoginGuard ],component : PrincipalComponent },
  { path:'virements',canActivate: [ LoginGuard ], component : VosvirementComponent },
  { path:'rendezvous',canActivate: [ LoginGuard ], component : RendezvousComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
