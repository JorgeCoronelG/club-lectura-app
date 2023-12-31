import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';

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
export class ForgotPasswordComponent implements OnInit {
  form = this.fb.group({
    correo: [null, [Validators.required, Validators.email]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
