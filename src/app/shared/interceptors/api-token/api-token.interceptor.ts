import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from '@shared/services/user-session.service';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  userSessionService: UserSessionService = inject(UserSessionService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiToken = this.userSessionService.apiToken;

    if (apiToken.length === 0) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${apiToken}`
    });

    return next.handle(request.clone({ headers }));
  }
}
