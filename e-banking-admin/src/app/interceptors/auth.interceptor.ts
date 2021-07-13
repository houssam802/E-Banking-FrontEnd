import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token : any
    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let modifiedReq:any;
      if (localStorage.getItem("token")!=null)
      {
        this.token = localStorage.getItem("token");
        modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Bearer ${this.token}`),
        });
        return next.handle(modifiedReq);
      }
      return next.handle(req);
    }
  
  

}
