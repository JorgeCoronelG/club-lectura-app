import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiTokenInterceptor } from '@shared/interceptors/api-token/api-token.interceptor';

export function apiTokenProvider(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true,
    }
  ];
}
