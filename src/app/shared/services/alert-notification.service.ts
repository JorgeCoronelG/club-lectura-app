import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { mergeDeep } from '@shared/utils/merge-deep';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationService {
  private typeNotications = Object.freeze({
    SUCCESS: ['success'],
    DANGER: ['danger'],
    INFO: ['info'],
    WARNING: ['warning'],
  });

  private snackbar = inject(MatSnackBar);

  success(message: string, action: string = 'Cerrar', config?: MatSnackBarConfig): void {
    this.showAlertNotification(message, action, this.typeNotications.SUCCESS, config);
  }

  danger(message: string, action: string = 'Cerrar', config?: MatSnackBarConfig): void {
    this.showAlertNotification(message, action, this.typeNotications.DANGER, config);
  }

  info(message: string, action: string = 'Cerrar', config?: MatSnackBarConfig): void {
    this.showAlertNotification(message, action, this.typeNotications.INFO, config);
  }

  warning(message: string, action: string = 'Cerrar', config?: MatSnackBarConfig): void {
    this.showAlertNotification(message, action, this.typeNotications.WARNING, config);
  }

  private showAlertNotification(
    message: string,
    action: string,
    panelClass: string[],
    config?: MatSnackBarConfig
  ): void {
    const newConfig = mergeDeep<MatSnackBarConfig | undefined, MatSnackBarConfig>(config, { panelClass });
    this.snackbar.open(message, action, newConfig);
  }
}
