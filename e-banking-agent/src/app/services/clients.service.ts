import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/Models/utilisateur';
import { Account } from 'src/Models/compte';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  Baseurl : string = "https://e-banking-api.herokuapp.com/api/clients/";


  constructor(private _http:HttpClient) { }
  
  getClient(id:any) : Observable<Client[]>{
    //let id = localStorage.getItem("id");
    return this._http.get<Client[]>(this.Baseurl+id);
  }
  addclient(client : any){
    return this._http.post("https://e-banking-api.herokuapp.com/api/clients/",client)
  }

  deleteClient(idclient:any){
    return this._http.delete(this.Baseurl+idclient)
  }
  
  addaccount(idclient:any,account : any){
    return this._http.post("https://e-banking-api.herokuapp.com/api/clients/"+idclient+"/accounts",account)
  }
  getlistaccount(idclient:any): Observable<Account[]>{
    return this._http.get<Account[]>(this.Baseurl+idclient+"/accounts")
  }


}
