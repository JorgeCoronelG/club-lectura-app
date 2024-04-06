import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { Libro } from '@shared/models/libro.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { booksManagmentTableColumns } from './books-managment-table-columns.data';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { trackById } from '@shared/utils/track-by';
import { toggleColumnVisibility, visibleColumns } from '@shared/utils/table.utils';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { LibroService } from '@shared/services/libro.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { FormsModule } from '@angular/forms';
import { UrlPipe } from '@shared/pipes/url/url.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '@shared/components/confirm-delete/confirm-delete.component';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

@Component({
  selector: 'app-books-managment',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    AdvancedFilterTableComponent,
    NgFor,
    NgIf,
    PaginatorComponent,
    FormsModule,
    CurrencyPipe,
    UrlPipe,
  ],
  templateUrl: './books-managment.component.html',
  styleUrls: ['books-managment.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class BooksManagmentComponent implements OnInit, ManagmentMethods {
  breadcrumbs: Breadcrumb[] = [
    { route: ['libros'], label: 'Libros' },
    { route: ['libros', 'gestion'], label: 'Gestión' }
  ];
  bookResponse?: PaginationResponse<Libro>;
  dataSource!: MatTableDataSource<Libro>;
  columns: TableColumn[] = booksManagmentTableColumns;
  filtersTable: FiltersTable = new FiltersTable();
  conditionOptions: CatalogoOpcion[] = [];
  languageOptions: CatalogoOpcion[] = [];
  statusOptions: CatalogoOpcion[] = [];

  trackById = trackById;
  visibleColumns = visibleColumns;
  toggleColumnVisibility = toggleColumnVisibility;

  constructor(
    private cd: ChangeDetectorRef,
    private catalogoOpcionService: OptionCatalogService,
    private libroService: LibroService,
    private dialog: MatDialog,
    private alertNotificationService: AlertNotificationService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Libro>();

    this.getFiltersTable();
    this.getData();
  }

  delete(id: number): void {
    this.dialog.open(ConfirmDeleteComponent)
      .afterClosed()
      .pipe(
        switchMap(confirm => (confirm) ? this.libroService.delete(id): of(false))
      )
      .subscribe(confirm => {
        if (confirm) {
          this.alertNotificationService.success('Registro eliminado');
          this.getData();
        }
      })
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getData();
  }

  paginationChange(meta: Meta): void {
    this.bookResponse!.meta = meta;
    this.getData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getData();
  }

  getData(): void {
    this.filtersTable.setPaginationOfMeta(this.bookResponse?.meta);

    this.libroService.findAllPaginated(this.filtersTable)
      .subscribe(response => {
        this.bookResponse = response;
        this.dataSource.data = response.data;
        this.cd.markForCheck();
      });
  }

  getFiltersTable(): void {
    forkJoin([
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTADO_FISICO_LIBRO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.IDIOMA),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_LIBRO),
    ]).pipe(
      map(([conditionOptions, languageOptions, statusOptions]) => {
        return [
          [{ ... allFilterEnum }].concat([... conditionOptions]),
          [{ ... allFilterEnum }].concat([... languageOptions]),
          [{ ... allFilterEnum }].concat([... statusOptions]),
        ];
      })
    ).subscribe(([conditionOptions, languageOptions, statusOptions]) => {
      this.conditionOptions = conditionOptions;
      this.languageOptions = languageOptions;
      this.statusOptions = statusOptions;
    });
  }
}
