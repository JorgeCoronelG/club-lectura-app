import { Component } from '@angular/core';
import { Subject } from "rxjs";
import { SpinnerService } from "../../services/spinner.service";

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <mat-progress-spinner [color]="'accent'"
                            [mode]="'indeterminate'">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      align-items: center;
      background-color: rgba(0,0,0,.2);
      display: flex;
      height: 100%;
      justify-content: center;
      position: fixed;
      width: 100%;
      z-index: 9999;
    }
  `]
})
export class SpinnerComponent {
  public isLoading$: Subject<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.isLoading$;
  }

}
