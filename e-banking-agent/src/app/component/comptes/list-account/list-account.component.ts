import { Component, OnInit } from '@angular/core';
import { Account } from 'src/Models/compte';
import { ActivatedRoute } from "@angular/router";
import { ClientsService} from "src/app/services/clients.service";

import { Client } from 'src/Models/utilisateur';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  clientSupprimer?:Client
  id_client?:any
  id_compte?:any;

  constructor(private route: ActivatedRoute, private clientserv : ClientsService, private agentserv:AgentService) { }
    
     
     Comptes?:Account[]
     
 

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get("id")),
    this.clientserv.getlistaccount(this.route.snapshot.paramMap.get("id")).subscribe(data => {
        this.Comptes=data
        console.log(data)
  } )

  }
  verifier(compte:any){
    var bouton: any = document.createElement('button');
    this.id_compte= compte.target.parentElement.parentElement.id;
    bouton.setAttribute("data-toggle", "modal");
    bouton.setAttribute("data-target", "#exampleModal2");
    document.body.append(bouton);
    bouton.click();
    bouton.remove();
  }


  supprimerCompte(){
    this.agentserv.deleteAccount(this.id_compte).subscribe(data =>{
      window.location.reload()
    })
    
  }


  verifierSupprimer(client: any){
    var bouton: any = document.createElement('button');
    bouton.setAttribute("data-toggle", "modal");
    bouton.setAttribute("data-target", "#exampleModal1");
    document.body.append(bouton);
    bouton.click();
    bouton.remove();
  }

  supprimerClient(){
    this.clientserv.deleteClient(this.route.snapshot.paramMap.get("id")).subscribe(data =>{

      window.history.back();
    }
    )
  }


}
