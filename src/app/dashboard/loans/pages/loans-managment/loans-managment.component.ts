import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { MaterialModule } from '@shared/material/material.module';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { Prestamo } from '@shared/models/prestamo.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { loansManagmentTableColumns } from './loans-managment-table-columns.data';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { trackById } from '@shared/utils/track-by';
import { visibleColumns } from '@shared/utils/table.utils';
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { PrestamoService } from '@shared/services/prestamo.service';
import { UrlPipe } from '@shared/pipes/url/url.pipe';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { forkJoin } from 'rxjs';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';

@Component({
  selector: 'app-loans-managment',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    AdvancedFilterTableComponent,
    DatePipe,
    FormsModule,
    NgFor,
    NgIf,
    PaginatorComponent,
    NgClass,
    UrlPipe
  ],
  templateUrl: './loans-managment.component.html',
  styleUrls: ['./loans-managment.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class LoansManagmentComponent implements OnInit, ManagmentMethods {
  breadcrumbs: Breadcrumb[] = [
    { route: ['prestamos'], label: 'Préstamos' },
    { route: ['prestamos', 'gestion'], label: 'Gestión' }
  ];
  loanResponse?: PaginationResponse<Prestamo>;
  dataSource!: MatTableDataSource<Prestamo>;
  columns: TableColumn[] = loansManagmentTableColumns;
  filtersTable: FiltersTable = new FiltersTable();
  statusLoansOptions: CatalogoOpcion[] = [];

  trackById = trackById;
  visibleColumns = visibleColumns;

  constructor(
    private cd: ChangeDetectorRef,
    private catalogoOpcionService: OptionCatalogService,
    private prestamoService: PrestamoService
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

    this.prestamoService.findAllPaginated(this.filtersTable)
      .subscribe(response => {
        this.loanResponse = response;
        this.dataSource.data = response.data;
        this.cd.markForCheck();
      });
  }

  private getFiltersTable(): void {
    forkJoin([
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_PRESTAMOS)
    ]).pipe(
      map(([statusLoans]) => {
        return [
          [{ ...allFilterEnum }].concat([... statusLoans])
        ];
      })
    ).subscribe(([statusLoans]) => {
      this.statusLoansOptions = statusLoans;
    });
  }
}
