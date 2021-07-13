import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agency } from 'src/app/models/agence';
import { Observable } from 'rxjs/internal/Observable';
import { Agent } from '../models/agent';
import { Client } from '../models/utilisateur';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AgenceService {

  private baseUrl: string = 'https://e-banking-api.herokuapp.com/api/agencies/';

  constructor(private http: HttpClient) {}
  
  public getagencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.baseUrl);
  }


  public getagents(id_agence:any) :Observable<any>{
    return this.http.get<any>(this.baseUrl+id_agence+"/agents")
  }

  public createAgency(agency: Agency) {
    return this.http.post<Agency>(this.baseUrl, agency);
  }


  public updateAgency(id: any, agency: Agency): Observable<any> {
    return this.http.put(this.baseUrl + id, agency);
  }

  

  public deleteAgency(id_agency : any) : Observable<any>{
    return this.http.delete(this.baseUrl+id_agency)
  }


  public createAgent(id_agency:any,agent:any):Observable<any>{
    return this.http.post(this.baseUrl+id_agency+"/agents",agent)
  }


}
