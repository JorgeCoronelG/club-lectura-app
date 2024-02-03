import { Component } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './confirm-delete.component.html',
  styles: [
  ]
})
export class ConfirmDeleteComponent {

}
