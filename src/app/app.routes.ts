import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@shared/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: ''
  }
];
