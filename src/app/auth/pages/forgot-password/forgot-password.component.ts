import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { AuthService } from '@shared/services/auth.service';
import { Usuario } from '@shared/models/usuario.model';
import { Router } from '@angular/router';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf
  ]
})
export class ForgotPasswordComponent {
  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  authService: AuthService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private alertNotificationService: AlertNotificationService,
    private router: Router,
  ) {}

  send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Partial<Usuario> = this.form.getRawValue();

    this.authService.restorePassword(user).subscribe(() => {
      this.alertNotificationService.info('Revisa tu bandeja de correo para encontrar la contraseña temporal de tu cuenta');
    });
  }

  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
