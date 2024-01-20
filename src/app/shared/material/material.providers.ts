import { EnvironmentProviders, Provider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

export function materialProviders(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
        autoFocus: false
      }
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3500
      }
    }
  ];
}
