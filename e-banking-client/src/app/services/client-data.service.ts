import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../Models/utilisateur';
import {Account} from '../../Models/Compte.Model'

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  Baseurl : string = "https://e-banking-api.herokuapp.com/api/clients/";

  constructor(private _http:HttpClient) { }

  getClient(id:any) : Observable<Client>{
    //let id = localStorage.getItem("id");
    return this._http.get<Client>(this.Baseurl+id);
  }


  getAccounts(id:any) :Observable<Account[]> {
    return this._http.get<Account[]>(this.Baseurl+id+"/accounts")
  }



  updatepwd(id_client:any,data : any) : Observable<Client>{
    return this._http.put<Client>(this.Baseurl+id_client+"/password",data);
  }

  createappointment(appointment : any):Observable<any>{
    return this._http.post<any>("https://e-banking-api.herokuapp.com/api/appointments/",appointment);
  }

  public getClientById(id : string) {
    return this._http.get(this.Baseurl+id);
  }
}
