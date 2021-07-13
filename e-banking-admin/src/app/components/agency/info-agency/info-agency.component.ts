import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-info-agency',
  templateUrl: './info-agency.component.html',
  styleUrls: ['./info-agency.component.css']
})
export class InfoAgencyComponent implements OnInit {

  agence !: Agency;
  editer : boolean = false;
  valide : boolean = true;
  error:string ="";

  constructor(private route: ActivatedRoute, private agenceServ: AgenceService) { }

  editOn(){
    this.editer = !this.editer;
  }

  changeAddress(){
    this.valide=true;
    var addInfo = document.querySelectorAll('input');
    addInfo.forEach( (input: any) => {
      let elem:any = document.getElementById(input.id)
      if(elem.value!=""){
        this.agence.address[input.name] = elem.value;
        if(this.valide) this.valide=true;
      }else{
        this.valide=false;
      }
    })
 
    if(!this.valide) this.error='Remplir tous les champs !!' ;
    if(this.valide){
       this.error='';
       this.agenceServ.updateAgency(this.agence?.id,this.agence).subscribe(resp => {
           window.location.reload()
       },err=>{
         console.log(err)
       })
    }
  }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    this.agenceServ.getagencies().subscribe(data => {
      data.forEach(elem => {
        if(elem.id==id){
          this.agence=elem
          console.log(this.agence)
        }
      })
    })
  }

}
