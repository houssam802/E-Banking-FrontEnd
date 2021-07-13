import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Agent} from 'src/Models/agent'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Baseurl : string = "https://e-banking-api.herokuapp.com/api/auth/";
  constructor(private _http:HttpClient) { }

  public seConnecter(agentDetail : any) : Observable<any>{
    return this._http.post<any>(this.Baseurl + "login",agentDetail);
}
  public estConnecte(){
    let token = localStorage.getItem('token');
    if(!token){
      return false;
    }else return true;
  }
 
  public deconnecter(){
    window.localStorage.clear();
    window.location.reload();
  }
  public getCurrentUser():Observable<Agent>{
    return this._http.get<Agent>(this.Baseurl+"me");
  }
}

