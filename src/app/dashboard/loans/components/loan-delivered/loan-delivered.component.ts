import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trackById } from '@shared/utils/track-by';
import { getDateFormat } from '@shared/utils/date.utils';
import { LoanService } from '@shared/services/loan.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo } from '@shared/models/prestamo.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { StatusLoan } from '@shared/enums/catalogo-opciones/status-loan.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-loan-delivered',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './loan-delivered.component.html',
  styles: []
})
export class LoanDeliveredComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  form!: FormGroup;
  statusLoan: CatalogoOpcion[] = [];
  statusFine: CatalogoOpcion[] = [];
  now = new Date();
  trackById = trackById;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private optionCatalogService: OptionCatalogService,
    private dialogRef: MatDialogRef<LoanDeliveredComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo
  ) {
    this.loadStatus();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      estatusId: [null, Validators.required]
    });

    this.form.get('estatusId')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((estatus: CatalogoOpcion) => {
      this.onChangeEstatusId(estatus);
    });
  }

  get fineAmount(): number {
    let fineAmount = 0;

    if (this.data.multa) {
      fineAmount += this.data.multa.costo!;
    }

    if (this.form.get('estatusId')?.value.opcionId === StatusLoan.PERDIDO) {
      fineAmount += this.data.libros[0].precio!;
    }

    return fineAmount;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data: Partial<Prestamo> = {};
    const { fechaRealEntrega, estatusId, multa } = this.form.getRawValue();

    if (estatusId.opcionId === StatusLoan.ENTREGADO) {
      data = {
        fechaRealEntrega: getDateFormat(fechaRealEntrega),
        estatusId: estatusId.id,
      };
    } else if (estatusId.opcionId === StatusLoan.PERDIDO) {
      data = {
        estatusId: estatusId.id,
        multa: {
          estatusId: multa.estatusId,
        }
      };
    }

    this.loanService.deliver(this.data.id, data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private onChangeEstatusId(estatus: CatalogoOpcion): void {
    this.form.removeControl('fechaRealEntrega');
    this.form.removeControl('multa');

    if (estatus.opcionId === StatusLoan.ENTREGADO) {
      this.form.addControl('fechaRealEntrega', this.fb.control(this.now, [Validators.required]));
    } else if (estatus.opcionId === StatusLoan.PERDIDO) {
      this.form.addControl('multa', this.fb.group({
        estatusId: [null, Validators.required],
      }));
    }

    this.form.updateValueAndValidity();
  }

  private loadStatus(): void {
    forkJoin([
      this.optionCatalogService.findByCatalogoId(CatalogoEnum.ESTATUS_PRESTAMOS, [StatusLoan.PRESTAMO]),
      this.optionCatalogService.findByCatalogoId(CatalogoEnum.ESTATUS_MULTA)
    ]).subscribe(([statusLoan, statusFine]) => {
      this.statusLoan = statusLoan;
      this.statusFine = statusFine;
    });
  }
}
