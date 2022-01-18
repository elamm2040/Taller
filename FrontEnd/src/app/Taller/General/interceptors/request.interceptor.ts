import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Token} from "../models/token";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  token: Token;

  constructor() {
    if (localStorage.getItem('user')) {
      this.token = Token.fromJson(JSON.parse(localStorage.getItem('user')!));
    } else {
      this.token = Token.fromJson({});
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("login") || request.url.includes("register") || request.url.includes("stillin") || request.url.includes("logout"))
      return next.handle(request);

    const headersNew = new HttpHeaders();
    let authorizedRequest = request.clone({
      headers: headersNew.append('Authorization', `Bearer ${this.token.token}`),
    });

    return next.handle(authorizedRequest);
  }
}
