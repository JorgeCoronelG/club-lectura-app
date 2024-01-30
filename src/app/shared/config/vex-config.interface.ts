import { CSSValue } from '../types/css-value.type';

export enum VexTheme {
  DEFAULT = 'vex-theme-default',
}

export enum VexConfigName {
  ares = 'ares',
}

export enum VexColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface VexConfig {
  id: VexConfigName;
  name: string;
  bodyClass: string;
  imgSrc: string;
  style: {
    themeClassName: string;
    colorScheme: VexColorScheme;
    borderRadius: CSSValue;
    button: {
      borderRadius: CSSValue | undefined;
    };
  };
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    imageUrl: string;
    showCollapsePin: boolean;
    state: 'expanded' | 'collapsed';
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    fixed: boolean;
  };
}

export type VexConfigs = Record<VexConfigName, VexConfig>;

export interface VexThemeProvider {
  name: string;
  className: string;
}
