import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { UserSessionService } from "../services/user-session.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userSessionService: UserSessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiToken = this.userSessionService.token;

    if (apiToken.length === 0) {
      return next.handle(req);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userSessionService.token}`
    });

    const reqClone = req.clone({ headers });

    return next.handle(reqClone);
  }
}
