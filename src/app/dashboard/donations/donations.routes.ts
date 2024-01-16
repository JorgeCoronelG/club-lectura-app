import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionPathRouteGuard } from '@shared/guards/permission-path-route.guard';

const routes: VexRoutes = [
  {
    path: '',
    title: 'Donaciones',
    loadComponent: () => import('./pages/donations-managment/donations-managment.component').then(c => c.DonationsManagmentComponent),
    canActivate: [
      permissionPathRouteGuard('/dashboard/donaciones')
    ]
  },
];

export default routes;
