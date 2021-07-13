
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from '../../Models/utilisateur';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient,private router : Router) { }

  baseUrl :string= "https://e-banking-api.herokuapp.com/api/auth/";

  login(clientDetail : any) : Observable<any>{
      return this._http.post<any>(this.baseUrl + "login",clientDetail);
  }


  Logout(){
    window.localStorage.clear();
    window.location.reload();
  }


  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(!token){
      return false;
    }else return true;
  }

  
  
  getCurrentUser():Observable<Client>{
    return this._http.get<Client>(this.baseUrl+"me");
  }


}
