import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiterarySubgenderRoutingModule } from './literary-subgender-routing.module';
import { LiterarySubgenderMaintenanceComponent } from './pages/literary-subgender-maintenance/literary-subgender-maintenance.component';


@NgModule({
  declarations: [
    LiterarySubgenderMaintenanceComponent
  ],
  imports: [
    CommonModule,
    LiterarySubgenderRoutingModule
  ]
})
export class LiterarySubgenderModule { }
