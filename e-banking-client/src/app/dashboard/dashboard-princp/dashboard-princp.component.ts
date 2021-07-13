import { Component, OnInit } from '@angular/core';
import { Account } from 'src/Models/Compte.Model';
import { Client } from 'src/Models/utilisateur';
import { CompteServiceService } from 'src/app/services/compte-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientDataService } from 'src/app/services/client-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionLike } from 'rxjs';


@Component({
  selector: 'app-dashboard-princp',
  templateUrl: './dashboard-princp.component.html',
  styleUrls: ['./dashboard-princp.component.css']
})
export class DashboardPrincpComponent implements OnInit {

  client ?: Client;
   
  comptes : Account[]=[];
  subscriptions : SubscriptionLike[] = [];

  values :Array<number> = new Array<number>() ;
  dates :Array<string> = new Array<string>() ;
  balanceTotal : number = 0;
  isDataAvailable : boolean = false;

 constructor(private clientsservice:CompteServiceService,
   private router:Router,private routeactuel:ActivatedRoute,
   private clientService : ClientDataService,
   private authservice : AuthenticationService) { }

 ngOnInit() {

  this.authservice.getCurrentUser().subscribe(data1 => {
    this.clientService.getAccounts(data1.id).subscribe(data2 => {
      this.comptes=data2
      this.comptes.forEach(elem => {
        this.balanceTotal+=elem.balance!;
      })
      this.isDataAvailable  = true;
    })
  })
}

 

  ngOnDestroy() {
    this.subscriptions?.forEach(
      (subscription) => subscription.unsubscribe());
  }

}
