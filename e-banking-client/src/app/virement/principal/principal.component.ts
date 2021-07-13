import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { VirementServiceService } from '../../services/virement-service.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ClientDataService} from '../../services/client-data.service'
import { Virement, VirementMultiple } from '../../../Models/Virement.Model';
import * as $ from 'jquery'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/Models/utilisateur';
import { Account } from 'src/Models/Compte.Model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit, OnDestroy {

  client ?: Client;

  virements : VirementMultiple = new VirementMultiple();
  montantTotal : number = 0;
  erreur : any = {};
  erreurTransaction : string = "";
  transactions !: FormGroup;
  submited = false;
  comptes : Account[]=[];

  constructor( public vService: VirementServiceService, private formBuilder: FormBuilder,
    private clientservice : ClientDataService,
    private authservice : AuthenticationService) { }



  princ(principalComponent:any){
    this.authservice.getCurrentUser().subscribe(data1 => {
      this.clientservice.getAccounts(data1.id).subscribe(data2 => {
        principalComponent.comptes=data2;
      })
    })
  }

  ngOnInit(): void {

    this.transactions = this.formBuilder.group({
      dateExecution: ['', [Validators.required, Validators.pattern("^((0[1-9]|[12][0-9]|3[01])[/\-](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[/\-](0[469]|1[1])|(0[1-9]|[12][0-9])[/\-](02))[/\-]((20[23][0-9]))$")]],
      motif: ['', Validators.required],
      total: ['', Validators.required],
      num_compte : ['', Validators.required]
    })

    this.transactions.controls['num_compte'].setValue(null);

    this.virements.multipleTransferRecipients = this.vService.virements;
    this.princ(this)
    this.authservice.getCurrentUser().subscribe(data => {
      this.client=data;
    })
  }

  ngAfterViewInit() {
    var date: any = document.querySelector('#dateCreation');
    date.value = new Date().toLocaleDateString();
    this.ajouterVirement(this);
  }

  invalidDateExecution()
  {
  	return (this.submited && (this.transactions.controls.dateExecution.errors != null || this.erreur.execution != null));
  }

  invalidMotif()
  {
  	return (this.submited && this.transactions.controls.motif.errors != null);
  }

  invalidTotal(){
    return (this.submited && (this.transactions.controls.total.errors != null || this.erreurTransaction != "" ));
  }

  invalidNum(){
    return (this.submited && this.transactions.controls.num_compte.errors != null);
  }

  onSubmit(){
    this.submited = true;
    this.transactions.get('total')?.setValue(document.forms[0]["total"].value);
    if(this.transactions.invalid == true) {
  		return;
  	} else {
      // Format JJ/MM/AAAA : n'est pas supporté dans l'objet Date .
      // on utilise Date.UTC(AAAA, MM, JJ);
      var creation: any = document.querySelector('#dateCreation');
      var execution: any = this.transactions.get("dateExecution");
      var date1 = creation.value.split('/');
      var date2 = execution.value.split('/');
      var creationDate = new Date(Date.UTC(date1[2], date1[1], date1[0]));
      var executionDate = new Date(Date.UTC(date2[2], date2[1], date2[0]));
      if( executionDate >= creationDate ){
        var form: any = document.forms[0];
        var formData = new FormData(form);
        this.virements.reason = formData.get("motif")!.toString() || "";
        this.virements.transferDate = executionDate ;
        this.virements.accountNumber = this.transactions.value.num_compte.number;
        var bouton = document.createElement("button");
        bouton.setAttribute('data-toggle', 'modal')
        bouton.setAttribute('data-target',"#modalVerification");
        bouton.style.display = "none";
        document.body.appendChild(bouton);
        bouton.click();
        bouton.remove();
      } else {
        this.erreur.execution = "Date après la création";
      }
    }
  }

  ajouterVirement(principalComponent: PrincipalComponent) {
    $('#virer').on('DOMNodeInserted', function(event){
      if($(event.target).is( "DIV") && event.target.classList.value != "formGroup header" ){
        if(principalComponent.virements.multipleTransferRecipients?.length!=0){
        var beneficiaires : any = document.getElementsByClassName('beneficiaire');
        for(let ben of beneficiaires){
          ben.onclick = (event: any) => {
			  console.log(event);
            principalComponent.montantTotal -= Number( principalComponent.virements.multipleTransferRecipients![ben.id].amount!);
            principalComponent.vService.supprimer(principalComponent.virements.multipleTransferRecipients![ben.id]);
            principalComponent.virements.multipleTransferRecipients = principalComponent.vService.virements;
          }  
        }
          principalComponent.montantTotal += Number( principalComponent.virements.multipleTransferRecipients![principalComponent.virements.multipleTransferRecipients!.length - 1].amount);
        } 
      }
    });
  }

  virer(){
    console.log(this.virements);
    this.vService.setVirements(this.client?.id,this.virements).subscribe( (data3) =>{
      window.location.reload()
    },err =>{
      var error = err.error.errors;
      if(error){
        this.erreurTransaction = error.accountNumber[0];
      }
    })
  }


  ngOnDestroy(){
    var form: any = document.forms[0];
    for(let input of form){
      if(input.type != "submit" && input.id != "dateCreation" )
        input.value = "";
    }
    this.virements = new VirementMultiple();
    this.vService.virements = [];
	 $('#virer').off('DOMNodeInserted');
  }

}
