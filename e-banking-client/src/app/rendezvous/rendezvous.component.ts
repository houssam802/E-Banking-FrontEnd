import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment, Client } from 'src/Models/utilisateur';
import { formatDate, Time } from "@angular/common";
import { AuthenticationService } from '../services/authentication.service';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit, AfterContentInit {

  rendezvous !: FormGroup;
  appointment !: Appointment;
  client !: Client;
  submitted = false; 

  constructor(private formBuilder: FormBuilder,private authsrv:AuthenticationService,private clientserv : ClientDataService) { }

  invalideDate(){
    return (this.submitted && this.rendezvous.controls.date.errors != null);
  }
  invalideTempsP(){
    return (this.submitted && this.rendezvous.controls.tempsP.errors != null);
  }
  invalideTempsF(){
    return (this.submitted && this.rendezvous.controls.tempsF.errors != null);
  }

  ngOnInit(): void {
    this.authsrv.getCurrentUser().subscribe( data => {
      this.client=data;
    })
    this.rendezvous = this.formBuilder.group({
      date: ['', Validators.required],
      tempsP: ['', Validators.required],
      tempsF: ['', Validators.required]
    });
  }

  ngAfterContentInit() {
    var tempsP: any = document.getElementById('tempsP');
    var tempsF: any = document.getElementById('tempsF');
    tempsP.min = "09:30";
    tempsP.max = "16:00";
    tempsP.value="09:30";
    tempsF.value="30";

    this.rendezvous.controls['tempsP'].setValue("09:30");
    this.rendezvous.controls['tempsF'].setValue("30");
  }

  onSubmit(){
    this.submitted = true;
    if(this.rendezvous.invalid == true) {
      return;
    } else {
      var form: any = document.getElementById('rendezForm');
      var formData = new FormData(form);
      var date = formData.get('date')?.toString(), 
          heureP = formData.get('tempsP')?.toString(), 
          duree = Number(formData.get('tempsF'));
      if( new Date(date || "") >= new Date() ){
        var temps1Date= new Date("01/01/2000 " + heureP);
        var temps2Date= new Date(temps1Date.getTime() + duree*60000);
        this.appointment = {
          client:this.client,
          agent:this.client.agent!,
          date:date,            
          startTime:('0' + temps1Date.getHours()).slice(-2) +":"+ ('0' + temps1Date.getMinutes()).slice(-2),
          endTime: ('0' + temps2Date.getHours()).slice(-2) +":"+ ('0' + temps2Date.getMinutes()).slice(-2)
        }

        console.log(this.appointment)
        this.clientserv.createappointment(this.appointment).subscribe(data => {
          window.location.reload();
        },err => {
          console.log(err)
        })
      } else {
        console.log('mmmmm');
      }
    }
  }

}
