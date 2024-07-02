import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trackById } from '@shared/utils/track-by';
import { getDateFormat, weekendDateFilter } from '@shared/utils/date.utils';
import { LoanService } from '@shared/services/loan.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo } from '@shared/models/prestamo.model';
import { Observable } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { StatusLoan } from '@shared/enums/catalogo-opciones/status-loan.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loan-delivered',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './loan-delivered.component.html',
  styles: []
})
export class LoanDeliveredComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  form!: FormGroup;
  statusLoan: CatalogoOpcion[] = [];
  now = new Date();
  trackById = trackById;
  weekendDateFilter = weekendDateFilter;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private optionCatalogService: OptionCatalogService,
    private dialogRef: MatDialogRef<LoanDeliveredComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo
  ) {
    this.optionCatalogService.findByCatalogoId(CatalogoEnum.ESTATUS_PRESTAMOS, [StatusLoan.PRESTAMO])
      .subscribe(res => this.statusLoan = res);
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

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Partial<Prestamo> = {
      fechaRealEntrega: getDateFormat(this.form.get('fechaRealEntrega')?.value),
      estatusId: this.form.get('estatusId')?.value.id,
    };

    this.loanService.deliver(this.data.id, data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private onChangeEstatusId(estatus: CatalogoOpcion): void {
    this.form.removeControl('fechaRealEntrega');

    if (estatus.opcionId === StatusLoan.ENTREGADO) {
      this.form.addControl('fechaRealEntrega', this.fb.control(this.now, [Validators.required]));
    }

    this.form.updateValueAndValidity();
  }
}
