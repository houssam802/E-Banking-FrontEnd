import { Component, OnInit,Inject } from '@angular/core';
import { ClientDataService } from 'src/app/services/client-data.service';
import { Observable, SubscriptionLike,of } from 'rxjs';
import { Client } from 'src/Models/utilisateur';
import { CompteServiceService } from 'src/app/services/compte-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  //client ?: Observable<Client>;
  client ?: Client;
  editPwordInd : Boolean = false;

  ancienPword ?: string;
  NouveauPword : string='';
  ConfirmPword : string ='';
  errors : any = {};


  constructor(private clientService :ClientDataService, private cmpteService : CompteServiceService,
     private authService :  AuthenticationService) { }

  
   ngOnInit() { 
    this.authService.getCurrentUser().subscribe(resp => {
      this.client=resp
    });

    }
    
    
    editPword(){
      this.editPwordInd=true;
    }
    
    updatePword(){
      this.errors={};
      if(this.NouveauPword.length >= 8){
       if(this.NouveauPword == this.ConfirmPword){
           console.log(this.ancienPword)
           this.clientService.updatepwd(this.client?.id,{
            currentPassword:this.ancienPword,
            newPassword:this.NouveauPword
           }).subscribe(data1 => {
             this.authService.Logout();
           },err => {
            this.errors.currentpwd="Mot de passe incorrect !"
           })
        }else {
          this.errors.confirmpwd = "Invalide !"      
        }
      }else{
         console.log('err8')
         this.errors.nouveaupwd = "Au moins 8 characters !" 
      }

  }
    
    

}
