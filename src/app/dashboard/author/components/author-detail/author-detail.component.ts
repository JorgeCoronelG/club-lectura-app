import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { FormErrors } from "../../../../core/utils/form-errors";
import { AuthorModel } from "../../models/author.model";
import { AuthorService } from "../../services/author.service";

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent {
  public authorForm: FormGroup;
  public formErrors: FormErrors;

  constructor(private dialogRef: MatDialogRef<AuthorDetailComponent>,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private authorService: AuthorService,
              @Inject(MAT_DIALOG_DATA) public data?: AuthorModel) {
    this.authorForm = this.formBuilder.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]]
    });

    this.formErrors = new FormErrors(this.authorForm);
  }

  public save(): void {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();
      return;
    }

    let author: AuthorModel = this.authorForm.value;
    if (!this.data) {
      // Se inserta el registro
      this.authorService.store(author).subscribe(() => {
        this.toastr.success(`Autor ${author.name} agregado.`, 'Proceso exitoso');
        this.close(true);
      });
    } else {
      // Se actualiza el registro
      author.id = this.data.id;
      this.authorService.update(author).subscribe(() => {
        this.toastr.success(`Autor ${author.name} actualizado.`, 'Proceso exitoso');
        this.close(true);
      });
    }
  }

  public close(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }
}
