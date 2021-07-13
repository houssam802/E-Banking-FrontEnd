import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Virement, VirementMultipleBeneficiaire } from '../../Models/Virement.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirementServiceService {

  constructor(private _http:HttpClient) { }

  url_account : string = "https://e-banking-api.herokuapp.com/api/clients/";
  
  virements : VirementMultipleBeneficiaire[] = [];

  ajouter(virement : VirementMultipleBeneficiaire) {
      this.virements.push(virement);
      return true;
  }

  supprimer(virement : VirementMultipleBeneficiaire) {
      this.virements = this.virements.filter((element) => { return element != virement });
  }

  public GetVirements(id_account:any){
    return this._http.get(this.url_account+id_account+"/multiple_transfers");
  }

  public setVirements(id_account:any,transfer:any){
    return this._http.post(this.url_account+id_account+"/multiple_transfers",transfer);
  }

}
