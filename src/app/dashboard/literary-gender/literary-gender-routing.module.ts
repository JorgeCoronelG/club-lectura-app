import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LiteraryGenderMaintenanceComponent
} from "./pages/literary-gender-maintenance/literary-gender-maintenance.component";

const routes: Routes = [
  { path: '', component: LiteraryGenderMaintenanceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiteraryGenderRoutingModule { }
