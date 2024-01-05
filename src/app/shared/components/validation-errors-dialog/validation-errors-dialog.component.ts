import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-errors-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './validation-errors-dialog.component.html',
  styles: [],
})
export class ValidationErrorsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public errors: string[]
  ) {
  }
}
