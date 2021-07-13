import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  errors : any = {};

  submitted = false;
  client !: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private router:Router,
    private authService : AuthenticationService,private _http: HttpClient) { }

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
          console.log(response.message)
        } else {
          console.log(response.token)
          window.localStorage.setItem('token',response.token);
          window.location.reload();
        }
      }, (error:any) => {
        console.log(error)
        this.errors.email="invalide email !"
        this.errors.pwd="Mot de passe incorrect !"
      });
    }
    console.log(this.client.value.email)
    this.submitted=true;
  }

  invalidPassword():boolean{
  	return (this.submitted && (this.errors.pwd != null || this.client.controls.pwd.errors != null ));
  }

  invalidEmailUtili():boolean{
  	return (this.submitted &&  (this.errors.email != null || this.client.controls.email.errors != null));
  }

}

    

