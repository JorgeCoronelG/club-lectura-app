import { ChangeDetectionStrategy, Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material.module';
import { Usuario } from '@shared/models/usuario.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Observable } from 'rxjs';
import { Rol } from '@shared/models/role.model';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { RolService } from '@shared/services/rol.service';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';
import { trackById } from '@shared/utils/track-by';
import { getDateFormat } from '@shared/utils/date.utils';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-user-create-update',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    OnlyNumbersDirective,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './user-create-update.component.html',
  styles: [],
})
export class UserCreateUpdateComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  form!: FormGroup;
  now: Date = new Date();
  sexOptions$: Observable<CatalogoOpcion[]>;
  rolesOptions$: Observable<Rol[]>;
  typeEscolarOptions$: Observable<CatalogoOpcion[]>;
  turnAlumnoOptions$: Observable<CatalogoOpcion[]>;
  typeUserOptions$: Observable<CatalogoOpcion[]>;
  trackById = trackById;

  constructor(
    private fb: FormBuilder,
    private catalogoOpcionService: OptionCatalogService,
    private rolService: RolService,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Usuario
  ) {
    this.sexOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.SEXO);
    this.rolesOptions$ = this.rolService.findAll();
    this.typeEscolarOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_ESCOLAR);
    this.turnAlumnoOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TURNO_ALUMNO);
    this.typeUserOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_USUARIO);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(191)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      fechaNacimiento: ['', Validators.required],
      sexoId: [null, Validators.required],
      rolId: [null, Validators.required],
      tipo: [null, Validators.required],
      tipoId: [null]
    });

    this.form.get('tipo')?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((tipo: CatalogoOpcion) => {
        this.form.patchValue({ tipoId: tipo.opcionId });
        this.generateValidatorsTypeUser(tipo.opcionId);
      });
  }

  get typeUser(): typeof TypeUserEnum {
    return TypeUserEnum;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Partial<Usuario> = {
      ... this.form.getRawValue(),
      fechaNacimiento: getDateFormat(this.form.get('fechaNacimiento')?.value),
      tipoId: this.form.get('tipo')?.value['id']
    };

    this.userService.store(user).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  generateValidatorsTypeUser(tipoId: any): void {
    this.form.removeControl('escolar');
    this.form.removeControl('alumno');

    if (tipoId === TypeUserEnum.ESCOLAR) {
      this.generateEscolarControl();
      return;
    }

    if (tipoId === TypeUserEnum.ALUMNO) {
      this.generateAlumnoControl();
      return;
    }

    this.form.updateValueAndValidity();
  }

  private generateEscolarControl(): void {
    this.form.addControl('escolar', this.fb.group({
      matricula: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ],
      tipoId: [null, Validators.required]
    }));
    this.form.updateValueAndValidity();
  }

  private generateAlumnoControl(): void {
    this.form.addControl('alumno', this.fb.group({
      grupo: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]
      ],
      turnoId: [null, Validators.required]
    }))
    this.form.updateValueAndValidity();
  }
}
