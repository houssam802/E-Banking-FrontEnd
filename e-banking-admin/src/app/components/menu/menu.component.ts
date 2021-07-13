import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','./menu.component2.css']
})
export class MenuComponent implements OnInit {
  isAuthenticated : boolean=false;
  nom ?: String;

  constructor(private authserv : AuthService, private router:Router) { }

  ngOnInit() {
   this.isAuthenticated=this.authserv.isLoggedIn();
   if(this.isAuthenticated==true){
      this.authserv.getCurrentUser().subscribe(response => {
        this.nom = response.firstName +" "+response.lastName;
      });
    }
  
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  logout(){
    this.authserv.Logout();
    window.location.href="/";
   }
}
