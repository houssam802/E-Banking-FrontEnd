import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/utilisateur';
import { AgenceService } from 'src/app/services/agence.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientsAgent : Client[] = [];

  agence!: String;
  agent!: String;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private agentServ: AgentService) { }

  ngOnInit(): void {
    var idAgent = this.route.snapshot.params['idAgent'];
    this.agentServ.getClients(idAgent).subscribe(data => {
      if(data.length!=0){
        this.clientsAgent=data;
        this.agence=data[0].agency?.title!;
        this.agent=data[0].agent?.firstName+" "+data[0].agent?.lastName;
      }
    })
  }

  afficherComptes(client: any){
    var idClient = client.target.parentElement.id;
    var id_Agence = this.route.snapshot.params['id_agence'];
    var idAgent = this.route.snapshot.params['idAgent'];
    this.router.navigate(['agents/' + id_Agence + '/' + idAgent + '/client/'+ idClient]);
  }

}
