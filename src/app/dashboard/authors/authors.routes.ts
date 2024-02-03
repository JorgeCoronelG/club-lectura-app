import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionPathRouteGuard } from '@shared/guards/permission-path-route.guard';

const routes: VexRoutes = [
  {
    path: '',
    title: 'Gestión de autores',
    loadComponent: () => import('./pages/authors-managment/authors-managment.component').then(c => c.AuthorsManagmentComponent),
    canActivate: [
      permissionPathRouteGuard('/autores')
    ]
  },
];

export default routes;
