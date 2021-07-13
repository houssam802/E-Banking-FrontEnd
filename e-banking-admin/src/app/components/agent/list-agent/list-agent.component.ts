import { Component, OnInit, ViewChild } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { AgenceService } from 'src/app/services/agence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { Agency } from 'src/app/models/agence';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {

  agents ?: Agent[] = [];
  agence !: Agency;
  agentSupprimer !: Agent;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private agenceServ: AgenceService,
    private agentServ: AgentService
  ) {}

  ngOnInit(): void {
    var idAgence = this.router.snapshot.params['id_agence'];
    this.agenceServ.getagencies().subscribe( (response: any) => {
      this.agence = response.find( (agence: any) => agence.id == idAgence )
    })
    this.agenceServ.getagents(idAgence).subscribe( data => {
      this.agents=data;
      let i=0;
      this.agents?.forEach(elem => {
        if(elem.id == data[i].id){
          elem.IDCard=data[i].idcard;
          i++;
        }
      })
    });
  }

  sesClients(agent: any){
    var id = agent.target.parentElement.id;
    var nomagence = this.router.snapshot.params['id_agence'];
    this.route.navigate(['agents/' + nomagence + '/' + id + '/clients']);
  }

  supprimerAgent(){
    this.agentServ.deleteAgent(this.agentSupprimer?.id!).subscribe( data => {
      window.location.reload();
    });
  }

  infosAgent(agent: any){
    var idAgence = this.router.snapshot.params['id_agence'];
    var idAgent = agent.target.parentElement.parentElement.id;
    this.route.navigate(["/agences/" + idAgence + "/agents/" + idAgent ]);
  }

  verifierSupprimer(agence: any){
    var idAgent = agence.target.parentElement.parentElement.id;
    this.agentSupprimer = this.agents?.find((ag) => ag.id == idAgent)!;
    var bouton: any = document.createElement('bouton');
    bouton.setAttribute("data-toggle", "modal");
    bouton.setAttribute("data-target", "#exampleModal");
    document.body.append(bouton);
    bouton.click();
    bouton.remove();
  }

}
