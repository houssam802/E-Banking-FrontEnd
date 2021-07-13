import {utilisateur,Client} from './utilisateur'
import {Agency} from './agence'

export class Agent extends utilisateur {
    agency ?: Agency;
    clients ?: Client[];
}