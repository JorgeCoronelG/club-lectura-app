import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanReaderRoutingModule } from './loan-reader-routing.module';
import { ResumeComponent } from './pages/resume/resume.component';


@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    LoanReaderRoutingModule
  ]
})
export class LoanReaderModule { }
