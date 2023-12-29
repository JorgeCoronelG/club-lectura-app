import { Component, Inject } from '@angular/core';
import { VexConfigService } from '@shared/config/vex-config.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { map } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';
import { AsyncPipe, KeyValuePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { VexColorScheme, VexConfig, VexConfigName, VexThemeProvider } from '@shared/config/vex-config.interface';
import { CSSValue } from '@shared/interfaces/css-value.type';
import { isNil } from '@shared/utils/is-nil';
import { defaultRoundedButtonBorderRadius } from '@shared/config/constants';
import { VEX_THEMES } from '@shared/config/config.token';
import { MaterialModule } from '@core/material/material.module';

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

  isRTL$: Observable<boolean> = this.config$.pipe(
    map((config) => config.direction === 'rtl')
  );

  colorScheme$: Observable<VexColorScheme> = this.config$.pipe(
    map((config) => config.style.colorScheme)
  );

  borderRadius$: Observable<number> = this.config$.pipe(
    map((config) => config.style.borderRadius.value)
  );

  ConfigName = VexConfigName;
  ColorSchemeName = VexColorScheme;
  selectedTheme$: Observable<string> = this.configService.select(
    (config) => config.style.themeClassName
  );
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

  layoutRTLChange(change: MatSlideToggleChange): void {
    this.configService.updateConfig({
      direction: change.checked ? 'rtl' : 'ltr'
    });
  }

  toolbarPositionChange(change: MatRadioChange): void {
    this.configService.updateConfig({
      toolbar: {
        fixed: change.value === 'fixed'
      }
    });
  }

  footerVisibleChange(change: MatSlideToggleChange): void {
    this.configService.updateConfig({
      footer: {
        visible: change.checked
      }
    });
  }

  footerPositionChange(change: MatRadioChange): void {
    this.configService.updateConfig({
      footer: {
        fixed: change.value === 'fixed'
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

  isSelectedButtonStyle(
    buttonStyle: CSSValue | undefined,
    config: VexConfig
  ): boolean {
    if (isNil(config.style.button.borderRadius) && isNil(buttonStyle)) {
      return true;
    }

    return buttonStyle?.value === config.style.button.borderRadius?.value;
  }

  selectButtonStyle(borderRadius: CSSValue | undefined): void {
    this.configService.updateConfig({
      style: {
        button: {
          borderRadius: borderRadius
        }
      }
    });
  }

  isDark(colorScheme: VexColorScheme): boolean {
    return colorScheme === VexColorScheme.DARK;
  }
}
