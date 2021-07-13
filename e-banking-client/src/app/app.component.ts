import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spring Mvc Angular Tutorial';
 
  // Object to save the response returned from the service.
  myresponse: any;
 
  // Url to fetch the employee records from the spring application.
  readonly APP_URL = 'http://localhost:8081/SpringMVCAnguar';

  header = new HttpHeaders().set('Access-Control-Allow-Origin', "http://localhost:4200/")
          .set('Access-Control-Allow-Methods',"POST, PUT, GET, OPTIONS, DELETE")
          .set('Access-Control-Allow-Headers',"authorization,Content-Type");
 
  constructor(private _http: HttpClient) { }
 
  // Method to fetch all employees from the database table.
  getAllEmployees() {
    this._http.post('api/v1/getemployees',{headers: this.header}).subscribe(
      data => {
        this.myresponse = data;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }
}