import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LiterarySubgenderMaintenanceComponent
} from "./pages/literary-subgender-maintenance/literary-subgender-maintenance.component";

const routes: Routes = [
  { path: '', component: LiterarySubgenderMaintenanceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiterarySubgenderRoutingModule { }
