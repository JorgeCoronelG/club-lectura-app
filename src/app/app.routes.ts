import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { loginGuard } from '@shared/guards/login.guard';
import { authGuard } from '@shared/guards/auth.guard';

export const appRoutes: VexRoutes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes'),
    canActivateChild: [
      loginGuard()
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    canActivateChild: [
      authGuard(),
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
