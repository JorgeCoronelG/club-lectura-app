import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@shared/interceptors/error/error.interceptor';

export function errorProvider(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ];
}
