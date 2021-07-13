import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AuthService } from 'src/app/services/auth.service';
import { Appointment, Client } from 'src/Models/utilisateur';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private agent_serv:AgentService, private auth_serv:AuthService) { }
 
Appointments?:Appointment[]
  


  ngOnInit(): void {
    this.auth_serv.getCurrentUser().subscribe(data => {
      this.agent_serv.getAppointements(data.id).subscribe(data1 => {
        this.Appointments=data1
      })
    })
    

  }

}
