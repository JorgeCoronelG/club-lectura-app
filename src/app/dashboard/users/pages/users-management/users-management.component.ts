import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { MaterialModule } from '@shared/material/material.module';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '@shared/models/usuario.model';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogoOpcionService } from '@shared/services/catalogo-opcion.service';
import { forkJoin } from 'rxjs';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { userTableColumns } from './users-managment-table-columns.data';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { FiltersTable } from '@shared/utils/filters-table';
import { toggleColumnVisibility, visibleColumns } from '@shared/utils/table-utils';
import { UserService } from '@shared/services/user.service';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Sort } from '@angular/material/sort';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { trackById } from '@shared/utils/track-by';
import { SexEnum } from '@shared/enums/catalogo-opciones/sex.enum';
import { StatusUserEnum } from '@shared/enums/catalogo-opciones/status-user.enum';
import { RolService } from '@shared/services/rol.service';
import { Rol } from '@shared/models/role.model';

@Component({
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
  ],
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class UsersManagementComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { route: ['usuarios'], label: 'Usuarios' },
    { route: ['usuarios', 'gestion'], label: 'Gestión' }
  ];
  userResponse?: PaginationResponse<Usuario>;
  dataSource!: MatTableDataSource<Usuario>;
  columns: TableColumn[] = userTableColumns;
  filtersTable: FiltersTable = new FiltersTable();
  genreOptions: CatalogoOpcion[] = [];
  statusUserOptions: CatalogoOpcion[] = [];
  rolesOptions: CatalogoOpcion[] = [];

  trackById = trackById<Usuario>;
  visibleColumns = visibleColumns;
  toggleColumnVisibility = toggleColumnVisibility;

  constructor(
    private cd: ChangeDetectorRef,
    private catalogoOpcionService: CatalogoOpcionService,
    private userService: UserService,
    private rolService: RolService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>();

    this.getFiltersTable();
    this.getUsersData();
  }

  get sex(): typeof SexEnum {
    return SexEnum;
  }

  get statusUser(): typeof StatusUserEnum {
    return StatusUserEnum;
  }

  updateUser(user: Usuario): void {
    console.log(user);
  }

  deleteUser(id: number): void {
    console.log(id);
  }

  paginationChange(meta: Meta): void {
    this.userResponse!.meta = meta;
    this.getUsersData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getUsersData();
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getUsersData();
  }

  private getUsersData(): void {
    this.filtersTable.setPaginationOfMeta(this.userResponse?.meta);

    this.userService.findAllPaginated(this.filtersTable)
      .subscribe(response => {
        this.userResponse = response;
        this.dataSource.data = response.data;
        this.cd.markForCheck();
      });
  }

  getFiltersTable(): void {
    forkJoin([
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.SEXO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_USUARIO),
      this.rolService.findAll(),
    ]).pipe(
      map(([genreOptions, statusUserOptions, roles]) => {
        return [
          [{ ... allFilterEnum }].concat([... genreOptions]),
          [{ ... allFilterEnum }].concat([... statusUserOptions]),
          [{ ... allFilterEnum }].concat(this.convertRolesToEnum(roles))
        ];
      })
    ).subscribe(([genreOptions, statusUserOptions, roles]) => {
      this.genreOptions = genreOptions;
      this.statusUserOptions = statusUserOptions;
      this.rolesOptions = roles;
    });
  }

  private convertRolesToEnum(roles: Rol[]): CatalogoOpcion[] {
    return roles.map(rol => {
      const opcion: CatalogoOpcion = {
        id: rol.id,
        opcionId: rol.id,
        catalogoId: 0,
        valor: rol.nombre,
        estatus: true
      };

      return opcion;
    });
  }
}
