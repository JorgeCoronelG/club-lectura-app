import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  Provider
} from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { VexLayoutService } from '@shared/services/vex-layout.service';
import { VexDemoService } from '@shared/services/vex-demo.service';
import { VexPlatformService } from '@shared/services/vex-platform.service';
import { VexConfig, VexThemeProvider } from '@shared/config/vex-config.interface';
import { VEX_CONFIG, VEX_THEMES } from '@shared/config/config.token';
import { VexHighlightModule } from '@shared/components/vex-highlight/vex-highlight.module';

export function provideVex(options: {
  config: VexConfig;
  availableThemes: VexThemeProvider[];
}): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(VexHighlightModule),
    {
      provide: VEX_CONFIG,
      useValue: options.config
    },
    {
      provide: VEX_THEMES,
      useValue: options.availableThemes
    },
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      } satisfies MatFormFieldDefaultOptions
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(VexLayoutService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(VexPlatformService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(VexDemoService),
      multi: true
    }
  ];
}
