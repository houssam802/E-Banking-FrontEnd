import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgenceService } from 'src/app/services/agence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Agency } from 'src/app/models/agence';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {


  agency ?: Agency;
  videError : boolean = false;

  agencyForm !: FormGroup;
  addressForm!: FormGroup;
  
  
  
  constructor(private agencyService: AgenceService, @Inject(FormBuilder) fb: FormBuilder) { 
    this.agencyForm=new FormGroup ({
      title:new FormControl('',Validators.required),
      address: fb.group({
          city: new FormControl('',Validators.required),
          country: new FormControl('',Validators.required),
          address1: new FormControl('', Validators.required),
          zipcode: new FormControl('',Validators.required),
      })
  
      })
  }

  ngOnInit(): void {
    this.agencyForm.controls['address'].setValue({
      city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
    
  }

  submit() {
    if (this.agencyForm.dirty) {
      if(this.agencyForm.valid){
        this.agency = this.agencyForm.value;
        this.agencyService.createAgency(this.agency!).subscribe(resp => {
          window.location.reload();
        },err => {
          console.log(err)
        })
      }else {
        this.videError = true;
      }
    }else{
      this.videError = true;
    }
  }

  reset() {
    this.agencyForm.reset();
    this.agencyForm.controls['address'].setValue({
      city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
  }

}
