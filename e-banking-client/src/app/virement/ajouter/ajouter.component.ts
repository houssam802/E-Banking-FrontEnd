import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrincipalComponent } from '../principal/principal.component';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit, AfterViewInit {

  submitted = false;
  erreur : any = {};
  virement!: FormGroup;

  constructor(private formBuilder: FormBuilder, private principale: PrincipalComponent) { }

  invalidBeneficiaire()
  {
  	return (this.submitted &&(this.virement.controls.beneficiaire.errors != null || this.erreur.compte != null));
  }

  invalidMontant()
  {
  	return (this.submitted && this.virement.controls.montant.errors != null);
  }


  ngOnInit(): void {
    this.virement = this.formBuilder.group({
      beneficiaire: ['', Validators.required],
      montant: ['', Validators.required]
    });
  }

  ngAfterViewInit(){
    
  }

  onSubmit(){
    this.submitted = true;
    if(this.virement.invalid == true) {
  		return;
  	} else {
      var form: any = document.forms[1];
      var formData = new FormData(form);
	  var montant = Number(formData.get('montant')?.toString());
	
	if(montant != 0){ 
	
      this.principale.vService.ajouter({
        accountNumber: formData.get('beneficiaire')?.toString()! ,
        amount: montant
      })
	  
      
      for(let formElement of form){
        if(formElement.id != "ajouter"){
          formElement.value = "";
        }
        if(formElement.id === "ajouter"){
          var i = document.createElement('li');
          i.setAttribute('data-dismiss', 'modal');
          i.style.display = 'none';
          formElement.append(i);
          i.click();
          formElement.removeChild(i);
          i.remove();
        }
      }
	}
    }
  }

}
