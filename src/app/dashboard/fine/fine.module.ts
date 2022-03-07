import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FineRoutingModule } from './fine-routing.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    FineRoutingModule
  ]
})
export class FineModule { }
