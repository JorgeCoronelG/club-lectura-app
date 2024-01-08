import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingService } from '@shared/interceptors/spinner-loading/spinner-loading.service';

@Component({
  selector: 'app-spinner-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="overlay flex flex-col">
      <div class="loader book">
        <figure class="page"></figure>
        <figure class="page"></figure>
        <figure class="page"></figure>
      </div>

      <h1>CARGANDO</h1>
    </div>
  `,
  styleUrls: ['./spinner-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerLoadingComponent {
  isLoading: boolean = false;

  spinnerLoadingService: SpinnerLoadingService = inject(SpinnerLoadingService);

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.spinnerLoadingService.isLoading$.asObservable()
      .subscribe((isLoading) => {
        if (this.isLoading !== isLoading) {
          this.isLoading = isLoading;
          this.cd.detectChanges();
        }
      });
  }
}
