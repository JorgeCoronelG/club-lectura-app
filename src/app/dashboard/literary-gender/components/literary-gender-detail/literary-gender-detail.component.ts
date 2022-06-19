import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { FormErrors } from "../../../../core/utils/form-errors";
import { LiteraryGenderModel } from "../../models/literary-gender.model";
import { LiteraryGenderService } from "../../services/literary-gender.service";

@Component({
  selector: 'app-literary-gender-detail',
  templateUrl: './literary-gender-detail.component.html',
  styleUrls: ['./literary-gender-detail.component.scss']
})
export class LiteraryGenderDetailComponent {
  public literaryGenderForm: FormGroup;
  public formErrors: FormErrors;

  constructor(private dialogRef: MatDialogRef<LiteraryGenderDetailComponent>,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private literaryGenderService: LiteraryGenderService,
              @Inject(MAT_DIALOG_DATA) public data?: LiteraryGenderModel) {
    this.literaryGenderForm = this.formBuilder.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });

    this.formErrors = new FormErrors(this.literaryGenderForm);
  }

  public save(): void {
    if (this.literaryGenderForm.invalid) {
      this.literaryGenderForm.markAllAsTouched();
      return;
    }

    let literaryGender: LiteraryGenderModel = this.literaryGenderForm.value;
    if (!this.data) {
      this.literaryGenderService.store(literaryGender).subscribe(() => {
        this.toastr.success(`Género literario ${literaryGender.name} agregado.`, 'Proceso exitoso');
        this.close(true);
      });
    } else {
      literaryGender.id = this.data.id;
      this.literaryGenderService.update(literaryGender).subscribe(() => {
        this.toastr.success(`Género literario ${literaryGender.name} actualizado.`, 'Proceso exitoso');
        this.close(true);
      });
    }
  }

  private close(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }
}
