import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
