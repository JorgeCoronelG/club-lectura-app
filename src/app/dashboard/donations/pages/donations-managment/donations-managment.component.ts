import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { MaterialModule } from '@shared/material/material.module';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { stagger80ms } from '@shared/animations/stagger.animation';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { FormArray, FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { trackById } from '@shared/utils/track-by';
import { uniqueUserValidator } from './validators-donation-form';

@Component({
  selector: 'app-donations-managment',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    ReactiveFormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './donations-managment.component.html',
  styles: [],
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ],
})
export class DonationsManagmentComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  usersForm!: UntypedFormGroup;
  users: Usuario[] = [];

  readonly trackById = trackById;
  readonly USER_BD = 1;
  readonly NEW_USER = 2;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private usersService: UserService,
  ) {}

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      typeUserAdd: [1, Validators.required],
      usersBD: this.fb.array([]),
      newUsers: this.fb.array([])
    });

    this.getDataForm();
  }

  get usersBDFormArray(): FormArray {
    return this.usersForm.get('usersBD') as FormArray;
  }

  get newUsersFormArray(): FormArray {
    return this.usersForm.get('newUsers') as FormArray;
  }

  get invalidFormUser(): boolean {
    return this.usersForm.invalid || (this.usersBDFormArray.length === 0 && this.newUsersFormArray.length === 0);
  }

  addNewUser(): void {
    if (this.usersForm.get('typeUserAdd')?.value === this.USER_BD) {
      return this.addExistUser();
    }

    if (this.usersForm.get('typeUserAdd')?.value === this.NEW_USER) {
      // todo: por hacer
    }
  }

  removeUserBD(index: number): void {
    this.usersBDFormArray.removeAt(index);
    this.usersBDFormArray.controls.forEach(control => {
      control.get('id')?.updateValueAndValidity();
    });
    this.cd.markForCheck();
  }

  private addExistUser(): void {
    this.usersBDFormArray.push(this.fb.group({
      id: [null, [Validators.required, uniqueUserValidator(() => this.usersBDFormArray)]]
    }));
  }

  private getDataForm(): void {
    this.usersService.findAll().subscribe(users => this.users = users);
  }
}
