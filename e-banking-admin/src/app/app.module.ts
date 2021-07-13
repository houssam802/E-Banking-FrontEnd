import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination/dist/ngx-pagination';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddAgentComponent } from './components/agent/add-agent/add-agent.component';
import { UpdateAgentComponent } from './components/agent/update-agent/update-agent.component';
import { ListAgentComponent } from './components/agent/list-agent/list-agent.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateAdminComponent } from './components/update-admin/update-admin.component';
import { AddAgencyComponent } from './components/agency/add-agency/add-agency.component';
import { ListAgencyComponent } from './components/agency/list-agency/list-agency.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AuthorisationGuard } from './guards/authorisation.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { InfoAgencyComponent } from './components/agency/info-agency/info-agency.component';
import { ComptesComponent } from './components/clients/comptes/comptes.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AddAgentComponent,
    UpdateAgentComponent,
    ListAgentComponent,
    MenuComponent,
    UpdateAdminComponent,
    AddAgencyComponent,
    ListAgencyComponent,
    ClientsComponent,
    InfoAgencyComponent,
    ComptesComponent
  ],
  imports: [
    NgxPaginationModule,
    AppRoutingModule,BrowserModule, 
    HttpClientModule,MatTableModule,
    MatNativeDateModule,MatButtonToggleModule,MatPaginatorModule,MatGridListModule,MatListModule,MatIconModule,
    MatFormFieldModule,MatSelectModule,FormsModule,ReactiveFormsModule,CommonModule, BrowserAnimationsModule
  ],
  providers: [AuthorisationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
