import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionPathRouteGuard } from '@shared/guards/permission-path-route.guard';
import { permissionRoleGuard } from '@shared/guards/permission-role.guard';
import { RolesEnum } from '@shared/enums/roles.enum';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full'
  },
  {
    path: 'gestion',
    title: 'Gestión de préstamos',
    loadComponent: () => import('./pages/loans-managment/loans-managment.component').then(c => c.LoansManagmentComponent),
    canActivate: [
      permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA]),
      permissionPathRouteGuard('/prestamos/gestion')
    ]
  },
  {
    path: 'mis-prestamos',
    title: 'Mis préstamos',
    loadComponent: () => import('./pages/my-loans/my-loans.component').then(c => c.MyLoansComponent),
    canActivate: [
      permissionRoleGuard([RolesEnum.LECTOR]),
      permissionPathRouteGuard('/prestamos/mis-prestamos')
    ]
  }
];

export default routes;
