import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { Agent } from 'src/app/models/agent';
import { Agency } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  agent ?: Agent;
  agencies ?: Agency[];

  videError : boolean = false;
  errorEmail = "";
  errorIdcard = "";

  agentForm !: FormGroup;
  addressForm!: FormGroup;
  
  invalidEmail(){
    return this.errorEmail != "";
  }

  invalidIdcard(){
    return this.errorIdcard != "";
  }
  
  constructor( private agencyService: AgenceService, @Inject(FormBuilder) fb: FormBuilder) { 
    this.agentForm=new FormGroup ({
      firstName:new FormControl('',Validators.required),
      lastName: new FormControl('', Validators.required),
      idcard: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      agency : new FormControl('', Validators.required),
      role : new FormControl('AGENT'),
      address: fb.group({
          city: new FormControl('',Validators.required),
          country: new FormControl('',Validators.required),
          address1: new FormControl('', Validators.required),
          zipcode: new FormControl('',Validators.required),
      })
  
      })
  }

  ngOnInit(): void {
    this.agentForm.controls['agency'].setValue(null);
    this.agentForm.controls['address'].setValue({
       city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
    
    this.agencyService.getagencies().subscribe(data => {
      this.agencies=data;
    })
  }

  submit() {
    this.videError = false;
    if (this.agentForm.dirty) {
      if(this.agentForm.valid){
        this.agencyService.createAgent(this.agentForm.controls['agency'].value.id, this.agentForm.value).subscribe(data=>{
          window.location.reload();
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

  reset() {
    this.agentForm.reset();
    this.agentForm.controls['agency'].setValue(null);
    this.agentForm.controls['address'].setValue({
      city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
  }


}



  