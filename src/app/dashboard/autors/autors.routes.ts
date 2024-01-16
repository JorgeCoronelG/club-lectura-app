import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionPathRouteGuard } from '@shared/guards/permission-path-route.guard';

const routes: VexRoutes = [
  {
    path: '',
    title: 'Gestión de autores',
    loadComponent: () => import('./pages/autors-managment/autors-managment.component').then(c => c.AutorsManagmentComponent),
    canActivate: [
      permissionPathRouteGuard('/dashboard/autores')
    ]
  },
];

export default routes;
