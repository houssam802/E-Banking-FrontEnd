import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../Models/Compte.Model';
import { VirementMultiple } from 'src/Models/Virement.Model';

@Injectable({
  providedIn: 'root'
})
export class CompteServiceService {

  constructor(private _http:HttpClient) { }

  Baseurl : string = "https://e-banking-api.herokuapp.com/api/accounts/";
  


  public  Getcomptes(id_compte:number): Observable<Array<VirementMultiple>>{
    return this._http.get<Array<VirementMultiple>>(this.Baseurl+id_compte+"/multiple_transfers");
  }

/*   public Getallcheque(vari:any):any{
    return this.httpClient.get(this.Baseurl+"Client/"+vari+"/chequecomptes");
  }
  
  public Getchequeid(vari:any){
    return this.httpClient.get(this.Baseurl+"cheque/comptes/"+vari);
  }
  public getAccountIdByNA(vari:any){
    return this.httpClient.get(this.Baseurl+"Virement/idaccount/"+vari);
  } */

}
