import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { Agent } from 'src/app/models/agent';
import { Agency } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnInit {

  agent ?: Agent;
  agencies ?: Agency[];

  agentForm !: FormGroup;
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
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private agencyService: AgenceService,
    @Inject(FormBuilder) fb: FormBuilder) { 
    this.agentForm=new FormGroup ({
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

  ngOnInit(): void {
    this.agentForm.controls['address'].setValue({
      city:0,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });


      this.agencyService.getagencies().subscribe(data => {
        this.agencies=data;
      })
    
    var id_agent=this.route.snapshot.params["idAgent"]
    var id_agence=this.route.snapshot.params["idAgence"]
    this.agencyService.getagents(id_agence).subscribe(data => {
      data.forEach((elem:any) =>{
        if(elem.id==id_agent){
          Object.keys(this.agentForm.controls).forEach(key => {
              if(key=='IDCard'){this.agentForm.controls[key].setValue(elem['idcard'])}
              else{
                if(key!="address") this.agentForm.controls[key].setValue(elem[key]);
                else {
                  this.agentForm.controls[key].setValue({
                    city:elem[key].city,
                    country : "Maroc",
                    address1:elem[key].address1,
                    zipcode:elem[key].zipcode,
                  });
                }
              }
            });
        }
      })
      
    })
  }

  submit() {
    this.videError = false;
    if (this.agentForm.dirty) {
      if(this.agentForm.valid){
        this.agent = this.agentForm.value;
        this.agentService.updateAgent(this.route.snapshot.params['idAgent'], this.agentForm.value!).subscribe( (response) => {
          window.location.reload();
        },(err: any) => {
          console.log(err)
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
    this.agentForm.controls['address'].setValue({
      city:0,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
  }



}
