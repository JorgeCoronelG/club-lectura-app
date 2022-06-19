
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../../shared/shared.module";

import { LiteraryGenderRoutingModule } from './literary-gender-routing.module';
import { LiteraryGenderMaintenanceComponent } from './pages/literary-gender-maintenance/literary-gender-maintenance.component';
import { LiteraryGenderDetailComponent } from './components/literary-gender-detail/literary-gender-detail.component';


@NgModule({
  declarations: [
    LiteraryGenderMaintenanceComponent,
    LiteraryGenderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    LiteraryGenderRoutingModule
  ]
})
export class LiteraryGenderModule { }
