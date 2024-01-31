import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideIcons } from '@shared/icons/icons.provider';
import { provideLuxon } from '@shared/luxon/luxon.provider';
import { provideVex } from '@shared/vex.provider';
import { provideNavigation } from '@shared/navigation/navigation.provider';
import { vexConfigs } from '@shared/config/vex-configs';
import { provideQuillConfig } from 'ngx-quill';
import { MaterialModule } from '@shared/material/material.module';
import { spinnerLoadingProvider } from '@shared/interceptors/spinner-loading/spinner-loading.provider';
import { apiTokenProvider } from '@shared/interceptors/api-token/api-token.provider';
import { errorProvider } from '@shared/interceptors/error/error.provider';
import { materialProviders } from '@shared/material/material.providers';
import {
  defaultTheme,
  greenTheme,
  orangeTheme,
  purpleTheme,
  redTheme,
  tealTheme
} from '@shared/config/available-themes.data';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MaterialModule,
      HttpClientModule,
    ),
    provideRouter(
      appRoutes,
      // TODO: Add preloading withPreloading(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    provideVex({
      /**
       * The config that will be used by default.
       * This can be changed at runtime via the config panel or using the VexConfigService.
       */
      config: vexConfigs.ares,
      /**
       * Only themes that are available in the config in tailwind.config.ts should be listed here.
       * Any theme not listed here will not be available in the config panel.
       */
      availableThemes: [
        defaultTheme,
        tealTheme,
        greenTheme,
        purpleTheme,
        redTheme,
        orangeTheme
      ]
    }),
    provideNavigation(),
    provideIcons(),
    provideLuxon(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    }),
    materialProviders(),
    spinnerLoadingProvider(),
    apiTokenProvider(),
    errorProvider()
  ]
};
