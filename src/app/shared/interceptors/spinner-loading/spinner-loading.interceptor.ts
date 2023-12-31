import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerLoadingService } from '@shared/components/spinner-loading/spinner-loading.service';

@Injectable()
export class SpinnerLoadingInterceptor implements HttpInterceptor {
  spinnerLoadingService: SpinnerLoadingService = inject(SpinnerLoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerLoadingService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        finalize(() => this.spinnerLoadingService.setLoading(false, request.url))
      );
  }
}
