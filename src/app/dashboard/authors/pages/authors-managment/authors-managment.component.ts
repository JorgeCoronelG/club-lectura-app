import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { MaterialModule } from '@shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '@shared/models/autor.model';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { authorTableColumns } from './author-table-columns.data';
import { trackById } from '@shared/utils/track-by';
import { AuthorService } from '@shared/services/author.service';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { visibleColumns } from '@shared/utils/table.utils';
import { MatDialog } from '@angular/material/dialog';
import { AuthorCreateUpdateComponent } from '../../components/author-create-update/author-create-update.component';
import { ConfirmDeleteComponent } from '@shared/components/confirm-delete/confirm-delete.component';
import { of, switchMap } from 'rxjs';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    VexBreadcrumbsComponent,
    VexPageLayoutComponent,
    VexPageLayoutContentDirective,
    VexPageLayoutHeaderDirective,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    AdvancedFilterTableComponent,
    PaginatorComponent
  ],
  templateUrl: './authors-managment.component.html',
  styles: [],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class AuthorsManagmentComponent implements OnInit, ManagmentMethods {
  breadcrumbs: Breadcrumb[] = [
    { route: ['autores'], label: 'Autores' },
    { route: ['autores'], label: 'Gestión' }
  ];
  authorResponse?: PaginationResponse<Autor>;
  dataSource!: MatTableDataSource<Autor>;
  columns: TableColumn[] = authorTableColumns;
  filtersTable: FiltersTable = new FiltersTable();

  trackById = trackById;
  visibleColumns = visibleColumns;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private alertNotificationService: AlertNotificationService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.getData();
  }

  createAuthor(): void {
    this.dialog.open(AuthorCreateUpdateComponent)
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.alertNotificationService.success('Registro creado');
          this.getData();
        }
      });
  }

  updateAuthor(id: number): void {
    this.authorService.show(id).subscribe(author => {
      this.dialog.open(AuthorCreateUpdateComponent, { data: author })
        .afterClosed()
        .subscribe((updated) => {
          if (updated) {
            this.alertNotificationService.success('Registro actualizado');
            this.getData();
          }
        });
    });
  }

  deleteAuthor(id: number): void {
    this.dialog.open(ConfirmDeleteComponent)
      .afterClosed()
      .pipe(
        switchMap(confirm => (confirm) ? this.authorService.delete(id): of(false))
      )
      .subscribe(confirm => {
        if (confirm) {
          this.alertNotificationService.success('Registro eliminado');
          this.getData();
        }
      });
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getData();
  }

  getData(): void {
    this.filtersTable.setPaginationOfMeta(this.authorResponse?.meta);

    this.authorService.findAllPaginated(this.filtersTable)
      .subscribe(response => {
        this.authorResponse = response;
        this.dataSource.data = this.authorResponse.data;
        this.cd.markForCheck();
      });
  }

  paginationChange(meta: Meta): void {
    this.authorResponse!.meta = meta;
    this.getData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getData();
  }
}
