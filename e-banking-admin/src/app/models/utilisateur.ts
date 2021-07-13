import { Time } from "@angular/common";
//import { Address } from "../../../node_modules/@types/node/cluster";
import {Address, Agency } from "./agence";
import { Agent } from "./agent";

export class utilisateur {
    id?: number;
    firstName?: string;
    lastName?: string;
    address?: Address;
    IDCard?: string;
    phoneNumber?: string;
    birthday?: Date;
    joiningDate?: Date;
    email?: string;
    password?: string;
    role?:string;
}


export class Client extends utilisateur{
    comptes ?: Account[];
    agent ?: Agent;
    agency ?: Agency;
    appointments ?: Appointment[];
}

export class Account {
    id?:number;
    number?: string;
    title?: string;
    status?: string;
    balance?: number;
}

export class Appointment {
    client ?: Client;
    agent ?: Agent ;
    startTime ?:Time;
    endTime ?:Date;
    date?:Date;
}