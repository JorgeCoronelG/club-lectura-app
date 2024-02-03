import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Autor } from '@shared/models/autor.model';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '@shared/services/author.service';

@Component({
  selector: 'app-author-create-update',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './author-create-update.component.html',
  styles: []
})
export class AuthorCreateUpdateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<AuthorCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Autor,
  ) {
    this.form = this.fb.nonNullable.group({
      nombre: [
        this.data?.nombre || '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(150)]
      ]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.data) {
      const author: Partial<Autor> = this.form.getRawValue();

      this.authorService.store(author).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    const author: Autor = {... this.form.getRawValue(), id: this.data.id };
    this.authorService.update(author, this.data.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
