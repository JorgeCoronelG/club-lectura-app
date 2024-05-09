import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Libro } from '@shared/models/libro.model';
import { Observable } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Genero } from '@shared/models/genero.model';
import { sizeFile } from '@shared/utils/form-validations.utils';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { GenreService } from '@shared/services/genre.service';
import { trackById } from '@shared/utils/track-by';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { AddAuthorTableComponent } from '@shared/components/add-author-table/add-author-table.component';
import { Autor } from '@shared/models/autor.model';
import { MatSelectionList } from '@angular/material/list';
import { AlertNotificationService } from '@shared/services/alert-notification.service';
import { BookService } from '@shared/services/book.service';

@Component({
  selector: 'app-book-create-update',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    AsyncPipe,
    OnlyNumbersDirective,
    AdvancedFilterTableComponent,
  ],
  templateUrl: './book-create-update.component.html',
  styles: [],
  animations: [
    stagger40ms,
  ]
})
export class BookCreateUpdateComponent implements OnInit {
  @ViewChild('authors') authorsList!: MatSelectionList;

  form!: FormGroup;
  conditionOptions$: Observable<CatalogoOpcion[]>;
  languageOptions$: Observable<CatalogoOpcion[]>;
  statusOptions$: Observable<CatalogoOpcion[]>;
  genreOptions$: Observable<Genero[]>;
  trackById = trackById;

  constructor(
   private fb: FormBuilder,
   private catalogoOpcionService: OptionCatalogService,
   private genreService: GenreService,
   private bookService: BookService,
   private alertNotificationService: AlertNotificationService,
   private dialogRef: MatDialogRef<BookCreateUpdateComponent>,
   private dialog: MatDialog,
   private cd: ChangeDetectorRef,
   @Inject(MAT_DIALOG_DATA) public data?: Libro
  ) {
    this.conditionOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTADO_FISICO_LIBRO);
    this.languageOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.IDIOMA);
    this.statusOptions$ = this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_LIBRO);
    this.genreOptions$ = this.genreService.findAll();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      isbn: [this.data?.isbn || null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      titulo: [this.data?.titulo || null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      numPaginas: [this.data?.numPaginas || null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      precio: [this.data?.precio || null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      edicion: [this.data?.edicion || null, [Validators.required, Validators.min(1), Validators.max(127)]],
      numCopia: [this.data?.numCopia || null, [Validators.required, Validators.min(1), Validators.max(127)]],
      estadoFisicoId: [this.data?.estadoFisicoId || null, Validators.required],
      idiomaId: [this.data?.idiomaId || null, Validators.required],
      estatusId: [this.data?.estatusId || null, Validators.required],
      generoId: [this.data?.generoId || null, Validators.required],
      resenia: [this.data?.resenia || null, Validators.maxLength(65000)],
      autores: this.fb.array([]),
    });

    if (!this.data) {
      this.form.addControl('imagen', this.fb.control(null, Validators.required));
      this.form.addControl('imagenFile', this.fb.control(null, sizeFile(5000)));
    } else {
      this.data.autores.forEach(author => this.addAuthor(author));
    }
  }

  get authorsFormArray(): FormArray {
    return this.form.get('autores') as FormArray;
  }

  changeImage(event: any): void {
    if (!event.target['files']) {
      return;
    }

    this.form.patchValue({
      imagenFile: event.target.files[0]
    });
  }

  openDialogAuthors(): void {
    this.dialog.open(AddAuthorTableComponent).afterClosed()
      .subscribe((author: Autor) => {
        if (!author) {
          return;
        }

        if (this.existAuthor(author.id)) {
          this.alertNotificationService.info(`El autor ${author.nombre} ya está agregado`);
          return;
        }

        this.addAuthor(author);
        this.cd.markForCheck();
    });
  }

  deleteAuthors(): void {
    const authorsId: number[] = this.authorsList.selectedOptions.selected.map(selected => selected.value);
    authorsId.forEach(id => {
      const index = this.authorsFormArray.controls
        .findIndex(control =>  control.get('id')?.value === id);

      this.authorsFormArray.removeAt(index);
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.authorsFormArray.length === 0) {
      this.alertNotificationService.warning('Debe agregar al menos un autor');
      return;
    }

    let book: Partial<Libro> = this.form.getRawValue();
    book.autores = this.authorsFormArray.controls
      .map(control => {
        return { id: control.get('id')?.value } as Partial<Autor>;
      });

    if (!this.data) {
      this.bookService.store(book).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    book.id = this.data.id;

    this.bookService.update(book, this.data.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private addAuthor(author: Partial<Autor>): void {
    this.authorsFormArray.push(this.fb.group({
      id: [author.id, Validators.required],
      nombre: [author.nombre]
    }));
  }

  private existAuthor(id: number): boolean {
    return this.authorsFormArray.controls
      .some(control => control.get('id')?.value === id);
  }
}
