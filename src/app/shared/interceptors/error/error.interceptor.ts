import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from '@shared/interceptors/error/error-response.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  ValidationErrorsDialogComponent
} from '@shared/components/validation-errors-dialog/validation-errors-dialog.component';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error, status }: HttpErrorResponse) => {
        if (status === 0) {
          this.createSnackBar('Favor de comunicarse con el administrador');
          return throwError(() => error);
        }

        this.validationErrors(error as ErrorResponse);

        if (status === 401) {
          // TODO: crear lógica cuando no está autorizado y limpiar la sesión
          this.router.navigateByUrl('/login');
        }

        if (status === 403) {
          this.router.navigateByUrl('/dashboard');
        }

        return throwError(() => error);
      })
    );
  }

  private validationErrors({ code, error }: ErrorResponse): void {
    if (typeof error === 'string') {
      this.createSnackBar(error);
      return;
    }

    if (code === 422) {
      let validationErrors: string[] = [];
      Object.entries(error).forEach(([, msgs]) => {
        const errors = msgs as string[];
        validationErrors = validationErrors.concat(errors);
      });

      this.dialog.open(ValidationErrorsDialogComponent, { data: validationErrors });
    }
  }

  private createSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
