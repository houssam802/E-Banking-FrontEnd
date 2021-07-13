import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from 'src/Models/agent';
import { Observable } from 'rxjs';
import { Appointment } from 'src/Models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  Baseurl : string = "https://e-banking-api.herokuapp.com/api/agents/";

  constructor(private _http:HttpClient) { 

  }

  getlistclient(idagent:any):Observable<Agent[]>{
      return this._http.get<Agent[]>(this.Baseurl+idagent+"/clients");
  }

  getAppointements(idagent:any):Observable<Appointment[]>{
    return this._http.get<Appointment[]>(this.Baseurl+idagent+"/appointments")
  }

  
  
  deleteAccount(idaccount:any){
    return this._http.delete("https://e-banking-api.herokuapp.com/api/accounts/"+idaccount)
  }
}
