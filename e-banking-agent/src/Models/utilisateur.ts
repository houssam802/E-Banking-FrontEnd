import { Time } from "@angular/common";
import { Agency } from "./agence";
import { Agent } from "./agent";
import { Account } from "./compte";

export class utilisateur {
    id?: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    idcard?: string;
    phoneNumber?: string;
    birthday?: Date;
    joiningDate?: Date;
    email?: string;
    password?: string;
}
export class Address {
    address1 ?: String; 
    address2 ?: String; 
    city ?: String;
    country ?: String;
    zipcode ?:String;
}


export class Client extends utilisateur{
    agent ?: Agent;
    agency ?: Agency;
    appointments ?: Appointment[];
    comptes ?: Account[]; 
}


export class Appointment {
    client ?: Client;
    agent ?: Agent ;
    startTime ?:string;
    endTime ?:string;
    date?:string;
}


