import { Component, Inject } from '@angular/core';
import { VexConfigService } from '@shared/config/vex-config.service';
import { map } from 'rxjs/operators';
import { AsyncPipe, KeyValuePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { VexColorScheme, VexConfig, VexConfigName, VexThemeProvider } from '@shared/config/vex-config.interface';
import { CSSValue } from '@shared/interfaces/css-value.type';
import { defaultRoundedButtonBorderRadius } from '@shared/config/constants';
import { VEX_THEMES } from '@shared/config/config.token';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'vex-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    UpperCasePipe,
    KeyValuePipe
  ]
})
export class ConfigPanelComponent {
  configs: VexConfig[] = this.configService.configs;
  config$: Observable<VexConfig> = this.configService.config$;

  colorScheme$: Observable<VexColorScheme> = this.config$.pipe(
    map((config) => config.style.colorScheme)
  );

  ColorSchemeName = VexColorScheme;
  isSelectedTheme$: Observable<(theme: string) => boolean> = this.configService
    .select((config) => config.style.themeClassName)
    .pipe(map((themeClassName) => (theme: string) => themeClassName === theme));

  roundedCornerValues: CSSValue[] = [
    {
      value: 0,
      unit: 'rem'
    },
    {
      value: 0.25,
      unit: 'rem'
    },
    {
      value: 0.5,
      unit: 'rem'
    },
    {
      value: 0.75,
      unit: 'rem'
    },
    {
      value: 1,
      unit: 'rem'
    },
    {
      value: 1.25,
      unit: 'rem'
    },
    {
      value: 1.5,
      unit: 'rem'
    },
    {
      value: 1.75,
      unit: 'rem'
    }
  ];

  roundedButtonValue: CSSValue = defaultRoundedButtonBorderRadius;

  constructor(
    private readonly configService: VexConfigService,
    @Inject(VEX_THEMES) public readonly themes: VexThemeProvider[]
  ) {}

  setConfig(layout: VexConfigName, colorScheme: VexColorScheme): void {
    this.configService.setConfig(layout);
    this.configService.updateConfig({
      style: {
        colorScheme
      }
    });
  }

  selectTheme(theme: VexThemeProvider): void {
    this.configService.updateConfig({
      style: {
        themeClassName: theme.className
      }
    });
  }

  enableDarkMode(): void {
    this.configService.updateConfig({
      style: {
        colorScheme: VexColorScheme.DARK
      }
    });
  }

  disableDarkMode(): void {
    this.configService.updateConfig({
      style: {
        colorScheme: VexColorScheme.LIGHT
      }
    });
  }

  isSelectedBorderRadius(borderRadius: CSSValue, config: VexConfig): boolean {
    return (
      borderRadius.value === config.style.borderRadius.value &&
      borderRadius.unit === config.style.borderRadius.unit
    );
  }

  selectBorderRadius(borderRadius: CSSValue): void {
    this.configService.updateConfig({
      style: {
        borderRadius: borderRadius
      }
    });
  }

  isDark(colorScheme: VexColorScheme): boolean {
    return colorScheme === VexColorScheme.DARK;
  }
}
