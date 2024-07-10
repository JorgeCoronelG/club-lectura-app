import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { visibleColumns } from '@shared/utils/table.utils';
import { trackById } from '@shared/utils/track-by';
import { authorsTableColumns } from '../../../dashboard/authors/pages/authors-managment/authors-table-columns.data';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { NgIf } from '@angular/common';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { MaterialModule } from '@shared/material/material.module';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { Autor } from '@shared/models/autor.model';
import { MatTableDataSource } from '@angular/material/table';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { AuthorService } from '@shared/services/author.service';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { stagger40ms } from '@shared/animations/stagger.animation';
import {
  AuthorCreateUpdateComponent
} from '../../../dashboard/authors/components/author-create-update/author-create-update.component';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

@Component({
  selector: 'app-add-author-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedFilterTableComponent,
    MaterialModule,
    NgIf,
    PaginatorComponent,
    VexPageLayoutContentDirective
  ],
  templateUrl: './add-author-table.component.html',
  styles: [],
  animations: [
    fadeInUp400ms,
    stagger40ms,
  ]
})
export class AddAuthorTableComponent implements OnInit, ManagmentMethods {
  authorResponse?: PaginationResponse<Autor>;
  dataSource!: MatTableDataSource<Autor>;
  columns: TableColumn[] = authorsTableColumns;
  filtersTable: FiltersTable = new FiltersTable();

  visibleColumns = visibleColumns;
  trackById = trackById;

  constructor(
    private cd: ChangeDetectorRef,
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<AddAuthorTableComponent>,
    private dialog: MatDialog,
    private alertNotificationService: AlertNotificationService,
  ) {
  }

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

  authorSelected(author: Autor): void {
    this.dialogRef.close(author);
  }
}
