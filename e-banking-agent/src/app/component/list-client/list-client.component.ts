import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/Models/agent';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/Models/utilisateur';
import { AgentService } from 'src/app/services/agent.service';






@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientSupprimer?:Client
  id_client?:any
  constructor(private agent_serv:AgentService, private auth_serv:AuthService, private clientserv:ClientsService) {
   }
   agent ?:Agent;
   client_temp?:Client[]

   Clients?:Client[]

  




test(event:any){
  this.client_temp=[]
  this.Clients?.forEach((element:any)=>{
    if(element.idcard.toLowerCase().startsWith(event.target.value.toLowerCase())){
      this.client_temp?.push(element)
  } 
}
)
if(event.target.value=="") this.client_temp= this.Clients!;
console.log(event.target.value)

}




  ngOnInit(): void {
    this.client_temp=this.Clients!
    this.auth_serv.getCurrentUser().subscribe(data1 => {
    this.agent_serv.getlistclient(data1?.id).subscribe(data => {
      console.log(data)
      this.Clients=data
      this.client_temp=data
    })
  })
  }


  supprimerClient(){
    this.clientserv.deleteClient(this.id_client).subscribe(data =>{
  
  window.location.reload()

    }
    )
  
  }

  verifierSupprimer(client: any){
    console.log(client)
   this.id_client= client.target.parentElement.parentElement.id;
    var bouton: any = document.createElement('button');
    bouton.setAttribute("data-toggle", "modal");
    bouton.setAttribute("data-target", "#exampleModal");
    document.body.append(bouton);
    bouton.click();
    bouton.remove();
  }
  
}


