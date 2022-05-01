import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../../shared/shared.module";

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorMaintenanceComponent } from './pages/author-maintenance/author-maintenance.component';


@NgModule({
  declarations: [
    AuthorMaintenanceComponent,
    AuthorDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
