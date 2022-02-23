import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, throwError } from "rxjs";
import { ErrorResponse } from "../models/error-response";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          this.errorHandling(error);
          return throwError(() => error.error);
        })
      );
  }

  public errorHandling(error: HttpErrorResponse): void {
    console.warn(error);
    const errors = error.error as ErrorResponse;
    if (typeof errors.error === 'string') {
      this.toastr.error(errors.error, 'Error');
    } else {
      // TODO: falta revisar la parte de las validaciones
    }
  }
}
