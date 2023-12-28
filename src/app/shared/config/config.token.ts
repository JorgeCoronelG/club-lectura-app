import { InjectionToken } from '@angular/core';
import { VexConfig, VexThemeProvider } from '@shared/config/vex-config.interface';

export const VEX_CONFIG = new InjectionToken<VexConfig>('VEX_CONFIG');
export const VEX_THEMES = new InjectionToken<VexThemeProvider[]>('VEX_THEMES');
