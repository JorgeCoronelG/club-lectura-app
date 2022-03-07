import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
