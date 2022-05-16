import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../../shared/shared.module";
import { UserMaintenanceComponent } from './pages/user-maintenance/user-maintenance.component';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@NgModule({
  declarations: [
    UserMaintenanceComponent,
    UserDetailComponent
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
