import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { AuthService } from '@shared/services/auth.service';
import { Usuario } from '@shared/models/usuario.model';
import { UserSessionService } from '@shared/services/user-session.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ]
})
export class LoginComponent {
  form: FormGroup;
  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private userSessionService: UserSessionService
  ) {
    const user = this.userSessionService.credentials;

    this.form = this.fb.nonNullable.group({
      correo: [(user) ? user.correo : '', [Validators.required, Validators.email]],
      contrasenia: [(user) ? user.contrasenia : '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      rememberMe: [!!(user)]
    });
  }

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Partial<Usuario> = this.form.getRawValue();
    this.authService.login(user).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
