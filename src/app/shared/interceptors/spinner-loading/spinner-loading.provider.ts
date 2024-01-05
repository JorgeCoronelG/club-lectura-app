import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerLoadingInterceptor } from '@shared/interceptors/spinner-loading/spinner-loading.interceptor';

export function spinnerLoadingProvider(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerLoadingInterceptor,
      multi: true
    }
  ];
}
