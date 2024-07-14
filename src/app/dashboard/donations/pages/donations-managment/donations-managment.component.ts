import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
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
import {
  emailExistValidator,
  generateValidatorsTypeUser,
  phoneExistValidator, uniqueEmailInFormValidator, uniquePhoneInFormValidator,
  uniqueUserValidator
} from './validators-donation-form';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { forkJoin } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Rol } from '@shared/models/role.model';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { RolService } from '@shared/services/rol.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';
import { Genero } from '@shared/models/genero.model';
import { GenreService } from '@shared/services/genre.service';
import { AddAuthorTableComponent } from '@shared/components/add-author-table/add-author-table.component';
import { Autor } from '@shared/models/autor.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertNotificationService } from '@shared/services/alert-notification.service';
import { MatSelectionList } from '@angular/material/list';
import { StoreDonation } from '../../interfaces/store-donation';
import { DonationService } from '@shared/services/donation.service';
import { MatStepper } from '@angular/material/stepper';
import { getDateFormat } from '@shared/utils/date.utils';

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
    OnlyNumbersDirective
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
  @ViewChildren('authors') authorsList!: QueryList<MatSelectionList>;
  @ViewChild('stepper') stepper!: MatStepper;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  readonly trackById = trackById;
  readonly USER_BD = 1;
  readonly NEW_USER = 2;

  usersForm!: UntypedFormGroup;
  booksForm!: UntypedFormGroup;
  users: Usuario[] = [];
  now: Date = new Date();
  sexOptions: CatalogoOpcion[] = [];
  rolesOptions: Rol[] = [];
  typeEscolarOptions: CatalogoOpcion[] = [];
  turnAlumnoOptions: CatalogoOpcion[] = [];
  typeUserOptions: CatalogoOpcion[] = [];
  statusUserOptions: CatalogoOpcion[] = [];
  careersOptions: CatalogoOpcion[] = [];
  conditionOptions: CatalogoOpcion[] = [];
  languageOptions: CatalogoOpcion[] = [];
  genreOptions: Genero[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private userService: UserService,
    private catalogoOpcionService: OptionCatalogService,
    private rolService: RolService,
    private genreService: GenreService,
    private dialog: MatDialog,
    private alertNotificationService: AlertNotificationService,
    private donationService: DonationService,
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.getDataForm();
  }

  get usersBDFormArray(): FormArray {
    return this.usersForm.get('usuariosExistentes') as FormArray;
  }

  get newUsersFormArray(): FormArray {
    return this.usersForm.get('usuariosNuevos') as FormArray;
  }

  get booksFormArray(): FormArray {
    return this.booksForm.get('libros') as FormArray;
  }

  get invalidFormUser(): boolean {
    return this.usersForm.invalid ||
      (this.usersBDFormArray.length === 0 && this.newUsersFormArray.length === 0) ||
      this.newUsersFormArray.status === 'PENDING';
  }

  get invalidFormBooks(): boolean {
    return this.booksForm.invalid;
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

  addNewBook(): void {
    this.booksFormArray.push(this.fb.group({
      isbn: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      titulo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      numPaginas: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      precio: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      edicion: [null, [Validators.required, Validators.min(1), Validators.max(127)]],
      numCopia: [null, [Validators.required, Validators.min(1), Validators.max(127)]],
      estadoFisicoId: [null, Validators.required],
      idiomaId: [null, Validators.required],
      generoId: [null, Validators.required],
      resenia: [null, Validators.maxLength(65000)],
      autores: this.fb.array([], Validators.required),
    }));
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

  openDialogAuthors(index: number): void {
    this.dialog.open(AddAuthorTableComponent).afterClosed()
      .subscribe((author: Autor) => {
        if (!author) {
          return;
        }

        if (this.existAuthor(author.id, index)) {
          this.alertNotificationService.info(`El autor ${author.nombre} ya está agregado`);
          return;
        }

        this.addAuthor(author, index);
        this.cd.markForCheck();
      });
  }

  deleteAuthors(index: number): void {
    const authorsId: number[] = this.authorsList.toArray()[index].selectedOptions.selected.map(selected => selected.value);
    authorsId.forEach(id => {
      const i = this.getAuthorsFormArray(index).controls
        .findIndex(control =>  control.get('id')?.value === id);

      this.getAuthorsFormArray(index).removeAt(i);
    });
  }

  deleteBook(index: number): void {
    this.booksFormArray.removeAt(index);
  }

  getAuthorsFormArray(index: number): FormArray {
    return this.booksFormArray.at(index).get('autores') as FormArray;
  }

  save(): void {
    let { usuariosExistentes, usuariosNuevos } = this.usersForm.getRawValue();
    const { libros } = this.booksForm.getRawValue();

    if (usuariosNuevos.length > 0) {
      usuariosNuevos.map((usuario: Usuario) => {
        usuario.fechaNacimiento = getDateFormat(usuario.fechaNacimiento);
        return usuario;
      });
    }

    const data: StoreDonation = { usuariosExistentes, usuariosNuevos, libros };
    this.donationService.store(data).subscribe(() => {
      this.alertNotificationService.success('Registro creado');
      this.clearFormsAndStepper();
    });
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
      correo: ['', {
        validators: [
          Validators.required,
          Validators.email,
          uniqueEmailInFormValidator(() => this.newUsersFormArray)
        ],
        asyncValidators: [emailExistValidator(this.userService, this.cd)],
        updateOn: 'blur'
      }],
      telefono: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            uniquePhoneInFormValidator(() => this.newUsersFormArray)
          ],
          asyncValidators: [phoneExistValidator(this.userService, this.cd)],
          updateOn: 'blur'
        }
      ],
      fechaNacimiento: ['', Validators.required],
      sexoId: [null, Validators.required],
      rolId: [null, Validators.required],
      tipoId: [null, Validators.required],
      donacion: this.fb.group({
        referencia: [null, [Validators.required, Validators.maxLength(500)]]
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
      this.userService.findAll('nombre_completo'),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.SEXO),
      this.rolService.findAll(),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_ESCOLAR),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TURNO_ALUMNO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.TIPO_USUARIO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_USUARIO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.CARRERAS_EDUCATIVAS),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTADO_FISICO_LIBRO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.IDIOMA),
      this.genreService.findAll()
    ]).subscribe(response => {
      this.users = response[0];
      this.sexOptions = response[1];
      this.rolesOptions = response[2];
      this.typeEscolarOptions = response[3];
      this.turnAlumnoOptions = response[4];
      this.typeUserOptions = response[5];
      this.statusUserOptions = response[6];
      this.careersOptions = response[7];
      this.conditionOptions = response[8];
      this.languageOptions = response[9];
      this.genreOptions = response[10];
    });
  }

  private existAuthor(id: number, index: number): boolean {
    return this.getAuthorsFormArray(index).controls
      .some(control => control.get('id')?.value === id);
  }

  private addAuthor(author: Partial<Autor>, index: number): void {
    this.getAuthorsFormArray(index).push(this.fb.group({
      id: [author.id, Validators.required],
      nombre: [author.nombre]
    }));
  }

  private clearFormsAndStepper(): void {
    this.initForms();
    this.stepper.reset();
  }

  private initForms(): void {
    this.usersForm = this.fb.group({
      typeUserAdd: [1, Validators.required],
      usuariosExistentes: this.fb.array([]),
      usuariosNuevos: this.fb.array([])
    });
    this.booksForm = this.fb.group({
      libros: this.fb.array([])
    });
    this.addNewBook();
  }
}
