import { Component, Inject } from '@angular/core';
import { VexConfigService } from '@shared/config/vex-config.service';
import { map } from 'rxjs/operators';
import { AsyncPipe, KeyValuePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { VexColorScheme, VexConfig, VexThemeProvider } from '@shared/config/vex-config.interface';
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
  config$: Observable<VexConfig> = this.configService.config$;

  colorScheme$: Observable<VexColorScheme> = this.config$.pipe(
    map((config) => config.style.colorScheme)
  );

  isSelectedTheme$: Observable<(theme: string) => boolean> = this.configService
    .select((config) => config.style.themeClassName)
    .pipe(map((themeClassName) => (theme: string) => themeClassName === theme));

  constructor(
    private readonly configService: VexConfigService,
    @Inject(VEX_THEMES) public readonly themes: VexThemeProvider[]
  ) {}

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

  isDark(colorScheme: VexColorScheme): boolean {
    return colorScheme === VexColorScheme.DARK;
  }
}
