import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { comparePassword } from '@shared/utils/form-validations.utils';
import { AuthService } from '@shared/services/auth.service';
import { Usuario } from '@shared/models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent {
  form: FormGroup;

  inputTypeCurrent = 'password';
  visibleCurrent = false;

  inputTypeNew = 'password';
  visibleNew = false;

  inputTypeConfirm = 'password';
  visibleConfirm = false;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private authService: AuthService
  ) {
    this.form = this.fb.nonNullable.group({
      contraseniaActual: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    }, {
      validators: [comparePassword('contrasenia', 'confirmPassword')]
    });
  }

  toggleVisibility(input: 'current' | 'new' | 'confirm'): void {
    switch (input) {
      case 'current':
        if (this.visibleCurrent) {
          this.inputTypeCurrent = 'password';
          this.visibleCurrent = false;
        } else {
          this.inputTypeCurrent = 'text';
          this.visibleCurrent = true;
        }
        break;
      case 'new':
        if (this.visibleNew) {
          this.inputTypeNew = 'password';
          this.visibleNew = false;
        } else {
          this.inputTypeNew = 'text';
          this.visibleNew = true;
        }
        break;
      case 'confirm':
        if (this.visibleConfirm) {
          this.inputTypeConfirm = 'password';
          this.visibleConfirm = false;
        } else {
          this.inputTypeConfirm = 'text';
          this.visibleConfirm = true;
        }
        break;
    }

    this.cd.markForCheck();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Partial<Usuario> = this.form.getRawValue();
    this.authService.changePassword(user).subscribe(() => {
      this.snackbar.open('Contraseña modificada', 'Cerrar');
      this.dialogRef.close();
    });
  }
}
