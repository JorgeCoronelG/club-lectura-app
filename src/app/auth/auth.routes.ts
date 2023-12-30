import { VexRoutes } from '@shared/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    title: 'Iniciar sesión',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'restablecer',
    title: 'Restablecer contraseña',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent)
  }
];

export default routes;
