import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider
} from '@angular/core';
import { MenuService } from './menu.service';
import { MenuLoaderService } from './menu-loader.service';

export function provideNavigation(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(MenuService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(MenuLoaderService),
      multi: true
    }
  ];
}
