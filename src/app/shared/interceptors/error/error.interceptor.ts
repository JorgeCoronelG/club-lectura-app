import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponse } from '@shared/interceptors/error/error-response.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  ValidationErrorsDialogComponent
} from '@shared/components/validation-errors-dialog/validation-errors-dialog.component';
import { Router } from '@angular/router';
import { UserSessionService } from '@shared/services/user-session.service';
import { MenuLoaderService } from '@shared/navigation/menu-loader.service';
import { VexConfigService } from '@shared/config/vex-config.service';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertNotificacionService: AlertNotificationService,
    private dialog: MatDialog,
    private router: Router,
    private userSessionService: UserSessionService,
    private menuLoaderService: MenuLoaderService,
    private vexConfigService: VexConfigService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error, status }: HttpErrorResponse) => {
        if (status === 0) {
          this.alertNotificacionService.warning('Favor de comunicarse con el administrador');
          return throwError(() => error);
        }

        this.validationErrors(error as ErrorResponse);

        if (status === 401) {
          this.userSessionService.removeToken();
          this.userSessionService.clearUser();
          this.menuLoaderService.loadDefaultNavigation();
          this.vexConfigService.removeTemplateConfig();
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
      if (code === 500) {
        this.alertNotificacionService.danger(error);
        return;
      }

      this.alertNotificacionService.warning(error);
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
}
