import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionPathRouteGuard } from '@shared/guards/permission-path-route.guard';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full'
  },
  {
    path: 'gestion',
    title: 'Gestión de usuarios',
    loadComponent: () => import('./pages/users-management/users-management.component').then(c => c.UsersManagementComponent),
    canActivate: [
      permissionPathRouteGuard('/usuarios/gestion')
    ]
  },
  {
    path: 'permisos',
    title: 'Permisos para usuarios',
    loadComponent: () => import('./pages/users-permission/users-permission.component').then(c => c.UsersPermissionComponent),
    canActivate: [
      permissionPathRouteGuard('/usuarios/permisos')
    ]
  }
];

export default routes;
