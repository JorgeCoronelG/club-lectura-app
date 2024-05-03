import { Component } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class FooterComponent {
  constructor() {}
}
