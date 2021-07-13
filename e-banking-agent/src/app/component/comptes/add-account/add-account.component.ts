import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { Account } from 'src/Models/compte';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  compte?:Account
  compteform!: FormGroup
  videError : boolean = false;

  constructor(private router:ActivatedRoute,private client_serv:ClientsService ) {
    this.compteform=new FormGroup({
      title:new FormControl('',Validators.required),
      balance:new FormControl('',Validators.required),
    })
  }
   
  
  

  

  valider(){
    this.videError = false;
    if (this.compteform.dirty) {
      if(this.compteform.valid){
    this.client_serv.addaccount(this.router.snapshot.params["id"],this.compteform.value).subscribe(data => {
      window.history.back()
  })
}else {
  this.videError = true;
}
}else{
this.videError = true;
}

}

  ngOnInit(): void {
  }

}
