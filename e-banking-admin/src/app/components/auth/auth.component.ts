import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  errors : any = {};

  submitted = false;
  client !: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private router:Router,
    private authService : AuthService,private _http: HttpClient) { }

  ngOnInit(): void {
    this.client = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd : ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.client.value.email!=""){
      this.authService.login({
        "username": this.client.value.email,
        "password": this.client.value.pwd
      }).subscribe( (response : any) => {
        this.errors = {};
        if(response.message){
        } else {
          window.localStorage.setItem('token',response.token);
          window.location.reload();
        }
      }, (error:any) => {
        this.errors.email="invalide email !"
        this.errors.pwd="Mot de passe incorrect !"
      });
    }
    this.submitted=true;
  }

  invalidPassword():boolean{
  	return (this.submitted && (this.errors.pwd != null || this.client.controls.pwd.errors != null ));
  }

  invalidEmailUtili():boolean{
  	return (this.submitted &&  (this.errors.email != null || this.client.controls.email.errors != null));
  }
}
