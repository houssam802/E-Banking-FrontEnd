import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'



import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { AuthentificationComponent } from './component/authentification/authentification.component';
import { AddAccountComponent } from './component/comptes/add-account/add-account.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { AppRoutingModule } from './app-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { ListClientComponent } from './component/list-client/list-client.component';
import { ListAccountComponent } from './component/comptes/list-account/list-account.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { RequestInterceptor } from './intercepteur/request.interceptor';




@NgModule({
  declarations: [
    AddClientComponent,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthentificationComponent,
    AddAccountComponent,
    ListClientComponent,
    ListAccountComponent,
    AppointmentComponent
  
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgImageSliderModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
