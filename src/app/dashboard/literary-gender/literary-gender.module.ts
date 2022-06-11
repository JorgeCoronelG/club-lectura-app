import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiteraryGenderRoutingModule } from './literary-gender-routing.module';
import { LiteraryGenderMaintenanceComponent } from './pages/literary-gender-maintenance/literary-gender-maintenance.component';


@NgModule({
  declarations: [
    LiteraryGenderMaintenanceComponent
  ],
  imports: [
    CommonModule,
    LiteraryGenderRoutingModule
  ]
})
export class LiteraryGenderModule { }
