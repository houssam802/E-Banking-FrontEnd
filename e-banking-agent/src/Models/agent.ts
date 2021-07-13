import { Agency } from './agence';
import {utilisateur,Client, Address} from './utilisateur'


export class Agent extends utilisateur{
    
    clients ?: Client[];
    agency ?: Agency;

}