import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RetryInterceptor } from '@shared/interceptors/retry/retry.interceptor';
import { RetryConfig } from 'rxjs';

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryConfig>(
  'retryConfig',
  {
    providedIn: 'root',
    factory: () => {
      return { count: 3, delay: 1000 } as RetryConfig;
    }
  }
);

export function retryProvider(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true,
    },
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: { count: 3, delay: 1000 }
    }
  ];
}
