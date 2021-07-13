import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/Models/Compte.Model';
import { CompteServiceService } from 'src/app/services/compte-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infos-compte',
  templateUrl: './infos-compte.component.html',
  styleUrls: ['./infos-compte.component.css']
})    
export class InfosCompteComponent implements OnInit {

  @Input() comptes ?: Array<Account>;
  @Output() ccompte = new EventEmitter<Account>();

  
  totalRecords ?: string;
  page ?: number = 1;
  showVar: boolean = true;
  public compte:any;
  constructor() { }

  ngOnInit(): void {}


}
