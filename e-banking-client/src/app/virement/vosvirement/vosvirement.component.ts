import { Component, OnInit } from '@angular/core';
import { Account } from 'src/Models/Compte.Model';
import { CompteServiceService } from 'src/app/services/compte-service.service'
import { ClientDataService } from 'src/app/services/client-data.service'
import { AuthenticationService} from 'src/app/services/authentication.service'
import { VirementMultiple } from 'src/Models/Virement.Model';

@Component({
  selector: 'app-vosvirement',
  templateUrl: './vosvirement.component.html',
  styleUrls: ['./vosvirement.component.css']
})
export class VosvirementComponent implements OnInit {

  public selectedName:any;
  totalRecords:any;
  comptes : Account[] = [];
  
  comptes_vir: Map<number, VirementMultiple[]> = new Map();

  constructor(private compteservice :CompteServiceService,
    private clientservice : ClientDataService,
    private authservice : AuthenticationService
    ){}


  id_util ?: number;
  id_comptes ?: number[]=[];
  ngOnInit(){
    this.authservice.getCurrentUser().subscribe(data1 => {
      this.clientservice.getAccounts(data1.id).subscribe(data2 => {
        this.comptes=data2;
        data2.forEach(elem => {
          this.compteservice.Getcomptes(elem.id!).subscribe( data => {
            this.comptes_vir.set(elem.id!, data);
          })
        })
      })
    })
  }

  isSender(fromAccount: any, numcompte: any){
    return fromAccount == numcompte;
  }

}
