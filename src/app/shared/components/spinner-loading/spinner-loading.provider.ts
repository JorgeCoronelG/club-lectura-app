import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerLoadingInterceptor } from '@core/interceptors/spinner-loading.interceptor';

export const spinnerLoadingProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SpinnerLoadingInterceptor,
  multi: true
};
