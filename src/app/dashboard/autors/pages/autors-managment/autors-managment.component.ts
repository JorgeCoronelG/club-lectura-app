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
import { FiltersTable } from '@shared/utils/filters-table';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { visibleColumns } from '@shared/utils/table-utils';

@Component({
  selector: 'app-autors-managment',
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
  templateUrl: './autors-managment.component.html',
  styles: [],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class AutorsManagmentComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { route: ['autores'], label: 'Autores' },
    { route: ['autores'], label: 'Gestión' }
  ];
  authorResponse?: PaginationResponse<Autor>;
  dataSource!: MatTableDataSource<Autor>;
  columns: TableColumn[] = authorTableColumns;
  filtersTable: FiltersTable = new FiltersTable();

  trackById = trackById<Required<Autor>>;
  visibleColumns = visibleColumns;

  constructor(
    private cd: ChangeDetectorRef,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.getAuthorsData();
  }

  updateAuthor(author: Autor): void {
    console.log(author);
  }

  deleteAuthor(id: number): void {
    console.log(id);
  }

  getAuthorsData(): void {
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
    this.getAuthorsData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getAuthorsData();
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getAuthorsData();
  }
}
