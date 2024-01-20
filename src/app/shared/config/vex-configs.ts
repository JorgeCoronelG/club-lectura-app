import { mergeDeep } from '../utils/merge-deep';
import { VexColorScheme, VexConfig, VexConfigName, VexConfigs, VexTheme } from './vex-config.interface';
import deepClone from '../utils/deep-clone';

const baseConfig: VexConfig = {
  id: VexConfigName.ares,
  name: 'Ares',
  bodyClass: 'vex-layout-ares',
  style: {
    themeClassName: VexTheme.DEFAULT,
    colorScheme: VexColorScheme.LIGHT,
    borderRadius: {
      value: 0.5,
      unit: 'rem'
    },
    button: {
      borderRadius: {
        value: 9999,
        unit: 'px'
      }
    }
  },
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    imageUrl: 'assets/img/logo/logo.svg',
    showCollapsePin: true,
    state: 'expanded'
  },
  navbar: {
    position: 'in-toolbar'
  },
  footer: {
    fixed: false
  }
};

export const vexConfigs: VexConfigs = {
  ares: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.ares,
    name: 'Ares',
    bodyClass: 'vex-layout-ares',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
    sidenav: {
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    }
  })
};
