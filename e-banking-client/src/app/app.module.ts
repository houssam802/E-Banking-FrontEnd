import { AppRoutingModule } from './app-routing.module';
import { BrowserModule} from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination/dist/ngx-pagination';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgpSortModule } from "ngp-sort-pipe";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';




 
import { AppComponent } from './app.component';
import { NavMatComponent } from './Menu/nav-mat/nav-mat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './authentification/authentification.component';
import { DashboardPrincpComponent } from './dashboard/dashboard-princp/dashboard-princp.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { InfosCompteComponent } from './dashboard/infos-compte/infos-compte.component';
import { ProfilComponent } from './compte/profil/profil.component';
import { AjouterComponent } from './virement/ajouter/ajouter.component';
import { PrincipalComponent} from './virement/principal/principal.component'
import { LoginGuard } from './guard/login.guard';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { VosvirementComponent } from './virement/vosvirement/vosvirement.component'
import { RequestsInterceptor } from './Interceptor/requests.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavMatComponent,
    AuthentificationComponent,
    DashboardPrincpComponent,
    DashboardNavComponent,
    InfosCompteComponent,
    ProfilComponent,
    AjouterComponent,PrincipalComponent, RendezvousComponent, VosvirementComponent
  ],

  imports: [
    NgpSortModule,NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,MatButtonToggleModule,MatSidenavModule,MatIconModule,MatListModule,
    MatFormFieldModule,MatSelectModule,
    BrowserAnimationsModule,BrowserModule,FormsModule,ReactiveFormsModule
  ],
  
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }