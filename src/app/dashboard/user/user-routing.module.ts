import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMaintenanceComponent } from "./pages/user-maintenance/user-maintenance.component";

const routes: Routes = [
  { path: '', component: UserMaintenanceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
