import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientDataService } from 'src/app/services/client-data.service'

@Component({
  selector: 'app-nav-mat',
  templateUrl: './nav-mat.component.html',
  styleUrls: ['./nav-mat.component.css','./nav-mat.component2.css']
})
export class NavMatComponent implements OnInit, AfterViewInit {
  isAuthenticated : boolean=false;
  nom ?: String;
  initialElement : String = "";

  constructor(private authService : AuthenticationService, 
    private router:Router,
    private clientservice: ClientDataService ) { }

  ngOnInit() {

    var path: any = window.location.href.split('/');

    this.initialElement = path[path.length - 1];

    this.isAuthenticated=this.authService.isLoggedIn();
    if(this.isAuthenticated){
      this.authService.getCurrentUser().subscribe(response => {
          this.nom=response?.firstName+" "+response?.lastName;
      });
    }
  }

  ngAfterViewInit(){
    var menuElem: any = document.getElementsByClassName('nav_elem_name');
    for(let elem of menuElem){
      if(this.initialElement == ""){
        if(elem.getAttribute("ng-reflect-router-link") == "dashboard"){
          elem.click();
        }
      }
      if(elem.getAttribute("ng-reflect-router-link") == this.initialElement){
        elem.click();
      }
    }
  }

  logout(){
    this.authService.Logout();
    window.location.href="/";
   }

}
