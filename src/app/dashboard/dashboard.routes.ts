import { VexRoutes } from '@shared/interfaces/vex-route.interface';
import { permissionRoleGuard } from '@shared/guards/permission-role.guard';
import { RolesEnum } from '@shared/enums/roles.enum';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent),
    children: [
      {
        path: 'inicio',
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
        loadChildren: () => import('./autors/autors.routes'),
        canActivateChild: [
          permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA])
        ]
      }
    ]
  }
];

export default routes;
