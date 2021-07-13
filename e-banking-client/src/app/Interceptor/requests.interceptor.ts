import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

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
