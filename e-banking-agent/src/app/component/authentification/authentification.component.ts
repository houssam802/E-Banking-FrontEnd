import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted  =  false;
  errors:any={}


  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder ) { }
    ngOnInit() {
      this.loginForm  =  this.formBuilder.group({
          email: ['', Validators.required,Validators.email],
          password: ['', Validators.required]
      });
  }
  get formControls() { return this.loginForm.controls; }

  
  seConnecter(){
    if(this.loginForm.value.email!=""){
      this.authService.seConnecter({
        "username": this.loginForm.value.email,
        "password": this.loginForm.value.password
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
    this.isSubmitted=true;
  }

}




