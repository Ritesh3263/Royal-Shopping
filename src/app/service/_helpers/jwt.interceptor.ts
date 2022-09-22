import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';
import { decryptValue } from 'src/app/common';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // console.log("request", request)
    // console.log("request URL", request.url)
    //  request.body && request.body

    if (request.body && request.body.open_api && request.body.token) {
      // console.log("request URL", request.url)
      // if (request.body.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${request.body.token}`
        }
      });
      // }

    } else {
      // console.log("request URL", request.url)
      const token = this.jwtService.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Token ${decryptValue(this.jwtService.getToken())}`
          }
        });

      }
    }

    // console.log("request Header set", request)
    return next.handle(request);
  }
}
