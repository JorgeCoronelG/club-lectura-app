import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { FormErrors } from "../../../core/utils/form-errors";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public resetPasswordForm: FormGroup;
  public formErrors: FormErrors;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]]
    });

    this.formErrors = new FormErrors(this.resetPasswordForm);
  }

  public resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const { email } = this.resetPasswordForm.value;
    this.authService.restorePassword(email)
      .subscribe(() => {
        this.toastr.success('Revisa tu cuenta de correo con la nueva contraseña.', 'Contraseña reestablecida');
        this.close();
      });
  }


  public close(): void {
    this.dialogRef.close();
  }
}
