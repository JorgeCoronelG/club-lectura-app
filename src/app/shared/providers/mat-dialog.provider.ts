import { EnvironmentProviders, Provider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

export function matDialogProvider(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
        autoFocus: false
      }
    }
  ];
}
