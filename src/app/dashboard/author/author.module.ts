import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
