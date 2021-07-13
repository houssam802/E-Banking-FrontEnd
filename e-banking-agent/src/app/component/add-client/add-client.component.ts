import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupName } from '@angular/forms';
import { AgentService } from 'src/app/services/agent.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/Models/utilisateur';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client?:Client;
  clientForm !: FormGroup;
  addressForm!: FormGroup;

  videError : boolean = false;
  errorEmail = "";
  errorIdcard = "";


  invalidEmail(){
    return this.errorEmail != "";
  }

  invalidIdcard(){
    return this.errorIdcard != "";
  }

  constructor(@Inject(FormBuilder) fb: FormBuilder, private client_serv:ClientsService) { 
    this.clientForm=new FormGroup ({
      firstName:new FormControl('',Validators.required),
      lastName: new FormControl('', Validators.required),
      idcard: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      address: fb.group({
          city: new FormControl('',Validators.required),
          country: new FormControl('',Validators.required),
          address1: new FormControl('', Validators.required),
          zipcode: new FormControl('',Validators.required),
      })

      })
  }

  valider(){

    
    if (this.clientForm.dirty) {
      if(this.clientForm.valid){
  
        this.client_serv.addclient(this.clientForm.value).subscribe(data => {
                window.location.reload()
        },(err: any) => {
          if(err.error.errors.email){
            this.errorEmail = err.error.errors.email[0];
          }
          if(err.error.errors.idcard){
            this.errorIdcard = err.error.errors.idcard[0];
          }
        })
      }else {
        this.videError = true;
      }
    }else{
      this.videError = true;
    }

  }

  ngOnInit(): void {
    this.clientForm.controls['address'].setValue({
      city:null,
      country : "Maroc",
      address1:'',
      zipcode:'',
     });
  }

  annuler(){
    this.clientForm.reset();
    this.clientForm.controls['address'].setValue({
      city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
  }
    

}
