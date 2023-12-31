import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SpinnerLoadingService } from '@shared/components/spinner-loading/spinner-loading.service';

@Component({
  selector: 'app-spinner-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async" class="overlay flex flex-col">
      <div class="loader book">
        <figure class="page"></figure>
        <figure class="page"></figure>
        <figure class="page"></figure>
      </div>

      <h1>CARGANDO</h1>
    </div>
  `,
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent {
  isLoading$: Observable<boolean>;

  spinnerLoadingService: SpinnerLoadingService = inject(SpinnerLoadingService);

  constructor() {
    this.isLoading$ = this.spinnerLoadingService.isLoading$.asObservable();
  }
}
