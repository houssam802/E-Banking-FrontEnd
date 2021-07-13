import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AddClientComponent } from './component/add-client/add-client.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { AuthentificationComponent } from './component/authentification/authentification.component';
import { AddAccountComponent } from './component/comptes/add-account/add-account.component';
import { ListAccountComponent } from './component/comptes/list-account/list-account.component';
import { HomeComponent } from './component/home/home.component';
import { ListClientComponent } from './component/list-client/list-client.component';


import { AuthGuard} from './Guards/auth.guard';
import { AuthService } from './services/auth.service';



const routes: Routes = [

   {
     path: 'home',
     component:HomeComponent,
     
   }, 
   {
     path: 'ajouterclient',
     component:AddClientComponent,
     canActivate: [AuthGuard]
     
   },
   {
     path:'listclient',
     component:ListClientComponent,
     canActivate: [AuthGuard]
   },
   {
    path:'listaccount/:id',
    component:ListAccountComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'listaccount/:id/ajoutercompte',
    component:AddAccountComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'mesrendezvous',
    component:AppointmentComponent,
    canActivate: [AuthGuard]
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: []
})
export class AppRoutingModule{}

