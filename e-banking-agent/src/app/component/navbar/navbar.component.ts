import { Component, OnInit } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service'
import { Agent} from 'src/Models/agent'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth_serv:AuthService) { }
 estconnecter:boolean=false
  
  Agent?:Agent
  nom:string="";

  ngOnInit(): void {
    this.estconnecter=this.auth_serv.estConnecte()
    this.auth_serv.getCurrentUser().subscribe(data=>{
      this.Agent=data
      this.nom=data.firstName+" "+data.lastName;
    })

  }

  logout(){
    this.auth_serv.deconnecter();
    window.location.href="/";
   }

}
