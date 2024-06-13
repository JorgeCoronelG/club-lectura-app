import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { UrlPipe } from '@shared/pipes/url/url.pipe';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { Libro } from '@shared/models/libro.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { BookService } from '@shared/services/book.service';
import { forkJoin } from 'rxjs';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { trackById } from '@shared/utils/track-by';
import { toggleColumnVisibility, visibleColumns } from '@shared/utils/table.utils';
import { libraryTableColumns } from './library-table';
import { StatusBookEnum } from '@shared/enums/catalogo-opciones/status-book.enum';

@Component({
  selector: 'app-library',
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
  templateUrl: './library.component.html',
  styleUrls: ['library.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class LibraryComponent implements OnInit, ManagmentMethods {
  breadcrumbs: Breadcrumb[] = [
    { route: ['libros'], label: 'Libros' },
    { route: ['libros', 'biblioteca'], label: 'Biblioteca' }
  ];
  bookResponse?: PaginationResponse<Libro>;
  dataSource!: MatTableDataSource<Libro>;
  columns: TableColumn[] = libraryTableColumns;
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
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Libro>();

    this.getFiltersTable();
    this.getData();
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

    this.bookService.findAllLibraryPaginated(this.filtersTable)
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
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_LIBRO, [StatusBookEnum.PERDIDO]),
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
