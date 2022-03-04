import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FormErrors } from "../../../core/utils/form-errors";
import { ResetPasswordComponent } from "../../components/reset-password/reset-password.component";
import { UserModel } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formErrors: FormErrors;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email-session') || '',
        [Validators.required, Validators.email, Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      rememberMe: [(localStorage.getItem('email-session') !== null)]
    });

    this.formErrors = new FormErrors(this.loginForm);
  }

  ngOnInit(): void {}

  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const user: UserModel = this.loginForm.value;
    this.authService.login(user).subscribe(() => {
      if (user.rememberMe) {
        localStorage.setItem('email-session', user.email!);
      } else {
        localStorage.removeItem('email-session');
      }

      this.router.navigateByUrl('/dashboard');
    });
  }

  public redirectPortal(): void {
    this.router.navigateByUrl('/portal');
  }

  public openDialog(): void {
    this.dialog.open(ResetPasswordComponent, {
      width: '350px'
    });
  }
}
