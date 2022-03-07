import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule
  ]
})
export class DonationModule { }
