import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = 'https://e-banking-api.herokuapp.com/api/admins/';

  constructor(private http: HttpClient) {}
  
  public updateAdmin(id_admin:any,admin:any) {
    return this.http.put(this.baseUrl+id_admin,admin);
  }
}
