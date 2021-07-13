import {Agent} from './agent'
import {Client} from './utilisateur'

export class Agency {
    id?: number;
    title ?: string;
    address ?:Address | any;
    agents ?: Agent[]; 
    clients ?:Client[];
}

export class Address {
    address1?:string;
    city?:string;
    zipcode ?:string;
    country ?:string;
}