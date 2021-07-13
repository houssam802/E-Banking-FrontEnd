import { Injectable } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account, Client } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl: string = 'https://e-banking-api.herokuapp.com/api/agents/';

  private baseUrl_client : string = 'https://e-banking-api.herokuapp.com/api/clients/';

  constructor(private http: HttpClient) {}


  public getClients(id_agent: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + id_agent + '/clients');
  }


  public get_Client_accounts(id_client:any) : Observable<Account[]>{
    return this.http.get<Account[]>(this.baseUrl_client+id_client+"/accounts")
  }

  public get_Client(id_client:any) : Observable<Client>{
    return this.http.get<Client>(this.baseUrl_client+id_client)
  }


  public deleteAgent(id_agent: number): Observable<any> {
    return this.http.delete(this.baseUrl + id_agent);
  }

  public updateAgent(id_agent: any, agent: Agent): Observable<any> {
    return this.http.put(this.baseUrl +id_agent, agent);
  }

  public updateAccount(id_client:any, status: any):Observable<any>{
    return this.http.put('https://e-banking-api.herokuapp.com/api/accounts/'+id_client+"/status", status);
  }

  public getAgentClients(idAgent: any): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl + '/' + idAgent + '/clients');
  }

}

