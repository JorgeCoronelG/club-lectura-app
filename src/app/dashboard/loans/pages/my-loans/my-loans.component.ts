import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { UrlPipe } from '@shared/pipes/url/url.pipe';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { Prestamo } from '@shared/models/prestamo.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { LoanService } from '@shared/services/loan.service';
import { forkJoin } from 'rxjs';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { myLoansTableColumns } from './my-loans-table-columns.data';
import { trackById } from '@shared/utils/track-by';
import { visibleColumns } from '@shared/utils/table.utils';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    PaginatorComponent,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    AdvancedFilterTableComponent,
    UrlPipe,
    DatePipe,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.scss']
})
export class MyLoansComponent implements OnInit, ManagmentMethods {
  breadcrumbs: Breadcrumb[] = [
    { route: ['prestamos'], label: 'Préstamos' },
    { route: ['prestamos', 'mis-prestamos'], label: 'Mis préstamos' }
  ];
  loanResponse?: PaginationResponse<Prestamo>;
  dataSource!: MatTableDataSource<Prestamo>;
  columns: TableColumn[] = myLoansTableColumns;
  filtersTable: FiltersTable = new FiltersTable();
  statusLoansOptions: CatalogoOpcion[] = [];
  statusFineOptions: CatalogoOpcion[] = [];

  trackById = trackById;
  visibleColumns = visibleColumns;

  constructor(
    private cd: ChangeDetectorRef,
    private catalogoOpcionService: OptionCatalogService,
    private loanService: LoanService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Prestamo>();

    this.getFiltersTable();
    this.getData();
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getData();
  }

  paginationChange(meta: Meta): void {
    this.loanResponse!.meta = meta;
    this.getData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getData();
  }

  getData(): void {
    this.filtersTable.setPaginationOfMeta(this.loanResponse?.meta);

    this.loanService.findAllByReaderPaginated(this.filtersTable)
      .subscribe(response => {
        this.loanResponse = response;
        this.dataSource.data = response.data;
        this.cd.markForCheck();
      });
  }

  private getFiltersTable(): void {
    forkJoin([
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_PRESTAMOS),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_MULTA)
    ]).pipe(
      map(([statusLoans, statusFines]) => {
        return [
          [{ ...allFilterEnum }].concat([... statusLoans]),
          [{ ...allFilterEnum }].concat([... statusFines]),
        ];
      })
    ).subscribe(([statusLoans, statusFines]) => {
      this.statusLoansOptions = statusLoans;
      this.statusFineOptions = statusFines;
    });
  }
}
