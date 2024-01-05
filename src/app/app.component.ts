import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerLoadingComponent } from '@shared/interceptors/spinner-loading/spinner-loading.component';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerLoadingComponent
  ]
})
export class AppComponent {}
