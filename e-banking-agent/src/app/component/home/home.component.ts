import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Agent } from 'src/Models/agent';
import { Client } from 'src/Models/utilisateur';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor(private auth_serv:AuthService) { }
 estconnecter:boolean=false
  
  Agent?:Agent

  ngOnInit(): void {
    this.estconnecter=this.auth_serv.estConnecte()
    this.auth_serv.getCurrentUser().subscribe(data=>{
      this.Agent=data
      console.log(data)
    })
    
  }

  logout(){
    this.auth_serv.deconnecter();
    window.location.href="/";
   }

}
