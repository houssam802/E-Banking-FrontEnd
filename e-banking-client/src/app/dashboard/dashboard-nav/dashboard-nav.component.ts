import { Component, OnInit ,Output,Input,EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {

  @Output() myEvent=new EventEmitter<boolean>()
  @Output() myEvent2=new EventEmitter()

  clientname ?: string;
  id:number=1
  @Input() balance : Number = 0;

  constructor(private authService : AuthenticationService,private router:Router) {
  }


  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(response => {

          this.clientname!=response?.firstName+" "+response?.lastName;
      });
  }




  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
