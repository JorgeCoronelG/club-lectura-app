import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorMaintenanceComponent } from "./pages/author-maintenance/author-maintenance.component";

const routes: Routes = [
  { path: '', component: AuthorMaintenanceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
