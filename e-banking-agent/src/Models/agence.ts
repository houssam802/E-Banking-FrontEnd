import {Agent} from './agent'
import {Address, Client} from './utilisateur'

export class Agency {
    title ?: string;
    agents ?: Agent[]; 
    clients ?: Client[];
    address ?: Address;
}