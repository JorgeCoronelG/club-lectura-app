import { LayoutComponent } from '@shared/layouts/layout/layout.component';
import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { loginGuard } from '@shared/guards/login.guard';

export const appRoutes: VexRoutes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes'),
    canActivateChild: [
      loginGuard
    ]
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
