import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry, RetryConfig } from 'rxjs';
import { RETRY_INTERCEPTOR_CONFIG } from '@shared/interceptors/retry/retry.provider';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private _retryConfig: RetryConfig = inject(RETRY_INTERCEPTOR_CONFIG);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(retry(this._retryConfig));
  }
}
