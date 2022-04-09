import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../../shared/shared.module";
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';

import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
