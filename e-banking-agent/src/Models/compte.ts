
import { Client } from './utilisateur';

export class Role {
    id?: number;
    roleName?: string;
}


export class Account {
    id?:number;
    number?: string;
    client?: Client;
    title?: string;
    status?: boolean;
    balance?: number;
}


export class Benificiaire {
    client?:Client;
    nom?:string;
    prenom?:string;
    number?:string
}