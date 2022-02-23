import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./pages/index/index.component";
import { PortalComponent } from "./portal.component";

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', component: IndexComponent }
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
