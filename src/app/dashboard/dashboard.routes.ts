import { VexRoutes } from '@shared/interfaces/vex-route.interface';

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
      }
    ]
  }
];

export default routes;
