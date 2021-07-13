import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    if(localStorage.getItem('token')==null){
      return false;
    }else return true;
  }

  
  
  getCurrentUser():Observable<Admin>{
    return this._http.get<Admin>(this.baseUrl+"me");
  }
  
}
