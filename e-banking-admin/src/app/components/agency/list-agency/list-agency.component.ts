import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-agency',
  templateUrl: './list-agency.component.html',
  styleUrls: ['./list-agency.component.css']
})
export class ListAgencyComponent implements OnInit {

  agencies ?: Agency[];
  agenceSupprimer ?: Agency;

  id_agency ?:number;

  constructor(
    private agencyService: AgenceService,
    private route: Router
  ) {}

  afficherAgents(agence: any){
    var idAgence = agence.target.parentElement.id;
    var agency = this.agencies?.find((ag) => ag.id == idAgence );
    this.route.navigate(["/agents/" + agency?.id ]);
  }


  infosAgence(agence: any){
    var idAgence = agence.target.parentElement.parentElement.id;
    this.route.navigate(["/agences/" + idAgence ]);
  }

  supprimerAgence(){
    this.agencyService.deleteAgency(this.id_agency).subscribe(data =>{
      window.location.reload();
    },err=>{
      console.log(err)
    });
  }

  verifierSupprimer(agence: any){
   this.id_agency = agence.target.parentElement.parentElement.id;
    var bouton: any = document.createElement('bouton');
    bouton.setAttribute("data-toggle", "modal");
    bouton.setAttribute("data-target", "#exampleModal");
    document.body.append(bouton);
    bouton.click();
    bouton.remove();
  }

  ngOnInit(): void {
    this.agencyService.getagencies().subscribe( data => {
      this.agencies=data;
    })
  }

}
