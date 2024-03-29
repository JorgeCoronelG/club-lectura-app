import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionRoleGuard } from '@shared/guards/permission-role.guard';
import { RolesEnum } from '@shared/enums/roles.enum';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./home/home.routes')
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA])
        ]
      },
      {
        path: 'autores',
        loadChildren: () => import('./authors/authors.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA])
        ]
      },
      {
        path: 'libros',
        loadChildren: () => import('./books/books.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA, RolesEnum.LECTOR])
        ]
      },
      {
        path: 'donaciones',
        loadChildren: () => import('./donations/donations.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA])
        ]
      },
      {
        path: 'prestamos',
        loadChildren: () => import('./loans/loans.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA, RolesEnum.LECTOR])
        ]
      }
    ]
  }
];

export default routes;
