import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FineService } from '@shared/services/fine.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo } from '@shared/models/prestamo.model';
import { StatusLoan } from '@shared/enums/catalogo-opciones/status-loan.enum';

@Component({
  selector: 'app-fine-paid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './fine-paid.component.html',
  styles: []
})
export class FinePaidComponent {
  constructor(
    private cd: ChangeDetectorRef,
    private fineService: FineService,
    private dialogRef: MatDialogRef<FinePaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo,
  ) {}

  get statusLoan(): typeof StatusLoan {
    return StatusLoan;
  }

  finePaid(): void {
    this.fineService.paid(this.data.multa!.id!).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
