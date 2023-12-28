import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@shared/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: []
  }
];
