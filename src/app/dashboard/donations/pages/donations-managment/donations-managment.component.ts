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
import { generateValidatorsTypeUser, uniqueUserValidator } from './validators-donation-form';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { forkJoin } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Rol } from '@shared/models/role.model';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { RolService } from '@shared/services/rol.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';

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
    OnlyNumbersDirective,
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

  readonly trackById = trackById;
  readonly USER_BD = 1;
  readonly NEW_USER = 2;

  usersForm!: UntypedFormGroup;
  users: Usuario[] = [];
  now: Date = new Date();
  sexOptions: CatalogoOpcion[] = [];
  rolesOptions: Rol[] = [];
  typeEscolarOptions: CatalogoOpcion[] = [];
  turnAlumnoOptions: CatalogoOpcion[] = [];
  typeUserOptions: CatalogoOpcion[] = [];
  statusUserOptions: CatalogoOpcion[] = [];
  careersOptions: CatalogoOpcion[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private usersService: UserService,
    private catalogoOpcionService: OptionCatalogService,
    private rolService: RolService,
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

  get typeUser(): typeof TypeUserEnum {
    return TypeUserEnum;
  }

  addNewUser(): void {
    if (this.usersForm.get('typeUserAdd')?.value === this.USER_BD) {
      return this.addExistUserForm();
    }

    if (this.usersForm.get('typeUserAdd')?.value === this.NEW_USER) {
      return this.addNewUserForm();
    }
  }

  removeUserBD(index: number): void {
    this.usersBDFormArray.removeAt(index);
    this.usersBDFormArray.controls.forEach(control => {
      control.get('id')?.updateValueAndValidity();
    });
  }

  removeNewUser(index: number): void {
    this.newUsersFormArray.removeAt(index);
  }

  private addExistUserForm(): void {
    this.usersBDFormArray.push(this.fb.group({
      id: [null, [Validators.required, uniqueUserValidator(() => this.usersBDFormArray)]],
      donacion: this.fb.group({
        referencia: ['El usuario ya estaba registrado en el club', [Validators.maxLength(500)]]
      })
    }));
  }

  private addNewUserForm(): void {
    const newUserForm = this.fb.group({
      nombreCompleto: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(191)
        ]
      ],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      fechaNacimiento: ['', Validators.required],
      sexoId: [null, Validators.required],
      rolId: [null, Validators.required],
      tipoId: [null, Validators.required],
      donacion: this.fb.group({
        referencia: [null, Validators.maxLength(500)]
      })
    });

    this.newUsersFormArray.push(newUserForm);
    newUserForm.get('tipoId')?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(tipoId => {
        generateValidatorsTypeUser(newUserForm, tipoId, this.fb);
      });
  }

  private getDataForm(): void {
    forkJoin([
      this.usersService.findAll(),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.SEXO),
      this.rolService.findAll(),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_ESCOLAR),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TURNO_ALUMNO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_USUARIO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_USUARIO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.CARRERAS_EDUCATIVAS),
    ]).subscribe(response => {
      this.users = response[0];
      this.sexOptions = response[1];
      this.rolesOptions = response[2];
      this.typeEscolarOptions = response[3];
      this.turnAlumnoOptions = response[4];
      this.typeUserOptions = response[5];
      this.statusUserOptions = response[6];
      this.careersOptions = response[7];
    });
  }
}
