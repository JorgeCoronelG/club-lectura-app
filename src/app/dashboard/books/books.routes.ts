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
    title: 'Gestión de libros',
    loadComponent: () => import('./pages/books-managment/books-managment.component').then(c => c.BooksManagmentComponent),
    canActivate: [
      permissionRoleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.CAPTURISTA]),
      permissionPathRouteGuard('/libros/gestion')
    ]
  },
  {
    path: 'biblioteca',
    title: 'Biblioteca',
    loadComponent: () => import('./pages/library/library.component').then(c => c.LibraryComponent),
    canActivate: [
      permissionRoleGuard([RolesEnum.LECTOR]),
      permissionPathRouteGuard('/libros/biblioteca')
    ]
  }
];

export default routes;
