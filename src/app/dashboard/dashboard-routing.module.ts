import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from "../core/enums/role";
import { PermissionGuard } from "../core/guards/permission.guard";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: { title: 'Dashboard' }
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { title: 'Usuarios', roles: [ Role.Admin ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'autores',
        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule),
        data: { title: 'Autores', roles: [ Role.Admin, Role.Capturist ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'donaciones',
        loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule),
        data: { title: 'Donaciones', roles: [ Role.Admin, Role.Capturist ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'libros',
        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
        data: { title: 'Libros', roles: [ Role.Admin, Role.Capturist ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'prestamos',
        loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule),
        data: { title: 'Préstamos', roles: [ Role.Admin, Role.Capturist ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'multas',
        loadChildren: () => import('./fine/fine.module').then(m => m.FineModule),
        data: { title: 'Multas', roles: [ Role.Admin, Role.Capturist ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'prestamos-resumen',
        loadChildren: () => import('./loan-reader/loan-reader.module').then(m => m.LoanReaderModule),
        data: { title: 'Resumen de préstamos', roles: [ Role.Reader ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      },
      {
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Mi perfil', roles: [ Role.Reader ] },
        canActivate: [ PermissionGuard ],
        canLoad: [ PermissionGuard ]
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
