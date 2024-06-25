import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo } from '@shared/models/prestamo.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Usuario } from '@shared/models/usuario.model';
import { Libro } from '@shared/models/libro.model';
import { trackById } from '@shared/utils/track-by';
import { UserService } from '@shared/services/user.service';
import { BookService } from '@shared/services/book.service';
import { getDateFormat, weekendDateFilter } from '@shared/utils/date.utils';
import { LoanService } from '@shared/services/loan.service';

@Component({
  selector: 'app-loan-create-update',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './loan-create-update.component.html',
  styles: [
  ]
})
export class LoanCreateUpdateComponent implements OnInit {
  form!: FormGroup;
  users$: Observable<Usuario[]>;
  books$: Observable<Libro[]>;
  now: Date = new Date();
  trackById = trackById;
  weekendDateFilter = weekendDateFilter;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    private loanService: LoanService,
    private dialogRef: MatDialogRef<LoanCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Prestamo
  ) {
    this.users$ = this.userService.findAllForLoan();
    this.books$ = this.bookService.findAllForLoan();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuarioId: [null, Validators.required],
      fechaPrestamo: [this.now, Validators.required],
      fechaEntrega: [null, Validators.required],
      libroId: [null, Validators.required],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.getRawValue();
    const books = [
      <Partial<Libro>>{ id: formData.libroId }
    ];
    const data: Partial<Prestamo> = {
      ... formData,
      libros: books,
      fechaPrestamo: getDateFormat(this.form.get('fechaPrestamo')?.value),
      fechaEntrega: getDateFormat(this.form.get('fechaEntrega')?.value),
    };

    this.loanService.store(data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
