import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from "./pages/book-detail/book-detail.component";
import { IndexComponent } from "./pages/index/index.component";
import { PortalComponent } from "./portal.component";

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', component: IndexComponent, data: { title: 'Inicio' } },
      { path: 'libro/:id', component: BookDetailComponent, data: { title: 'Detalle del libro' } }
    ]
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PortalRoutingModule { }
