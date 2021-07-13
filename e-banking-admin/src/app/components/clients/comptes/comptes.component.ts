import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Account, Client } from 'src/app/models/utilisateur';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit, AfterViewInit {

  comptesClient !: Account[];
  client !: Client;
  checked ?:Boolean=false;

  constructor(private route: ActivatedRoute,private agentserv:AgentService) { }

  ngOnInit(): void {
    var idClient = this.route.snapshot.params['idClient'];
    this.agentserv.get_Client_accounts(idClient).subscribe( data => {
      this.comptesClient=data;
    })

    this.agentserv.get_Client(idClient).subscribe( data => {
      this.client=data;
    })
  }

  ngAfterViewInit(){
    var idClient = this.route.snapshot.params['idClient'];
    this.agentserv.get_Client_accounts(idClient).subscribe( data => {
      data.forEach( (client: any) => {
       var check: any = document.querySelector("#c" + client.number + " td:last-child input[type='checkbox']");
       var td: any = check.parentElement;
       var label: any = check.previousSibling; 
       if( client.status.match("ACTIVE") ){
         label.childNodes[0].classList.add('actif');
         check.checked = true;
         td.classList.add('activated');
         td.classList.remove('desactivated');
       } else {
         check.checked = false;
         td.classList.remove('activated');
         td.classList.add('desactivated');
       }
     });
   })
  }

  switch(elem:any){
    var check = elem.target;
    var td: any = check.parentElement;
    var label: any = check.previousSibling; 
    if(elem.target.checked){
      label.childNodes[0].classList.toggle('actif');
      td.classList.add('activated');
      td.classList.remove('desactivated');
      var compte: any = this.comptesClient.find(client => client.number == td.parentElement.id.replaceAll(/\D/g,''));
      compte.status = "ACTIVE";
      this.agentserv.updateAccount(compte.id, { status: "ACTIVE" }).subscribe((data) => {});
    } else {
      label.childNodes[0].classList.toggle('actif');
      td.classList.remove('activated');
      td.classList.add('desactivated');
      var compte: any = this.comptesClient.find(client => client.number == td.parentElement.id.replaceAll(/\D/g,''));
      compte.status = "SUSPENDED";
      this.agentserv.updateAccount(compte.id, { status: "SUSPENDED" }).subscribe((data) => {});
    }
  }

}


