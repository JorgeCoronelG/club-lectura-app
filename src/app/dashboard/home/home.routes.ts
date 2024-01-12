import { VexRoutes } from '@shared/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(c => c.HomeComponent),
    title: 'Inicio'
  },
];

export default routes;
