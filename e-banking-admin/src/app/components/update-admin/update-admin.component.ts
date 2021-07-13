import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { Agency } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  admin ?: Admin;
  agencies ?: Agency[];

  adminForm !: FormGroup;
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
    private adminserv:AdminService,
    private authsrv:AuthService,
    @Inject(FormBuilder) fb: FormBuilder) { 
    this.adminForm=new FormGroup ({
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
    this.adminForm.controls['address'].setValue({
      city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
    
    this.authsrv.getCurrentUser().subscribe((data:any) => {
      Object.keys(this.adminForm.controls).forEach(key => {
        if(key=='IDCard'){this.adminForm.controls[key].setValue(data['idcard'])}
        else{
           if(key!="address") this.adminForm.controls[key].setValue(data[key]);
           else {
            this.adminForm.controls[key].setValue({
               city:data[key].city,
               country : "Maroc",
               address1:data[key].address1,
               zipcode:data[key].zipcode,
              });
           }
        }
      });
    })
  }





  submit() {
    this.videError = false;
    if (this.adminForm.dirty) {
      if(this.adminForm.valid){
          this.admin = this.adminForm.value;
          this.adminserv.updateAdmin(1,this.adminForm.value).subscribe(data=>{
             this.authsrv.Logout();
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
    this.adminForm.reset();
    this.adminForm.controls['address'].setValue({
       city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
  }


}
