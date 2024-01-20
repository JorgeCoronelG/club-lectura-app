import { mergeDeep } from '../utils/merge-deep';
import { VexColorScheme, VexConfig, VexConfigName, VexConfigs, VexTheme } from './vex-config.interface';
import deepClone from '../utils/deep-clone';

const baseConfig: VexConfig = {
  id: VexConfigName.apollo,
  name: 'Apollo',
  bodyClass: 'vex-layout-apollo',
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
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/apollo.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    imageUrl: 'assets/img/logo/logo.svg',
    showCollapsePin: true,
    state: 'expanded'
  },
  navbar: {
    position: 'below-toolbar'
  },
  footer: {
    fixed: false
  }
};

export const vexConfigs: VexConfigs = {
  apollo: baseConfig,
  poseidon: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.poseidon,
    name: 'Poseidon',
    bodyClass: 'vex-layout-poseidon',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/poseidon.png',
    sidenav: {
      search: {
        visible: true
      }
    },
    toolbar: {
    }
  }),
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
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  })
};
