import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvancedFilterTableComponent } from '@shared/components/advanced-filter-table/advanced-filter-table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { VexBreadcrumbsComponent } from '@shared/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutComponent } from '@shared/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutContentDirective } from '@shared/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@shared/components/vex-page-layout/vex-page-layout-header.directive';
import { MaterialModule } from '@shared/material/material.module';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { Usuario } from '@shared/models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/interfaces/table-column.interface';
import { userPermissionTableColumns } from './users-permission-table-columns.data';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { trackById } from '@shared/utils/track-by';
import { visibleColumns } from '@shared/utils/table.utils';
import { UserService } from '@shared/services/user.service';
import { RolService } from '@shared/services/rol.service';
import { map, switchMap } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { Rol } from '@shared/models/role.model';
import { Sort } from '@angular/material/sort';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { NgIf } from '@angular/common';
import { fadeInUp400ms } from '@shared/animations/fade-in-up.animation';
import { stagger40ms } from '@shared/animations/stagger.animation';
import { NavigationService } from '@shared/services/navigation.service';
import { NavigationData } from '../../interfaces/navigation-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { AssignPermissionComponent } from '../../components/assign-permission/assign-permission.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    AdvancedFilterTableComponent,
    PaginatorComponent,
    VexBreadcrumbsComponent,
    VexPageLayoutComponent,
    VexPageLayoutContentDirective,
    VexPageLayoutHeaderDirective,
    NgIf,
  ],
  templateUrl: './users-permission.component.html',
  styles: [],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class UsersPermissionComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { route: ['usuarios'], label: 'Usuarios' },
    { route: ['usuarios', 'permisos'], label: 'Permisos' }
  ];
  userResponse?: PaginationResponse<Usuario>;
  dataSource!: MatTableDataSource<Usuario>;
  columns: TableColumn[] = userPermissionTableColumns;
  filtersTable: FiltersTable = new FiltersTable();
  rolesOptions: CatalogoOpcion[] = [];

  trackById = trackById;
  visibleColumns = visibleColumns;

  constructor(
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private rolService: RolService,
    private navigationService: NavigationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>();

    this.getFiltersTable();
    this.getUsersData();
  }

  changePermissions(userId: number): void {
    this.navigationService.getNavigationByUserId(userId)
      .pipe(
        switchMap(navigation => {
          const data: NavigationData = {
            menus: navigation,
            usuarioId: userId,
          };

          return this.dialog
            .open(AssignPermissionComponent, { data })
            .afterClosed();
        })
      )
      .subscribe(updated => {
        if (updated) {
          this.snackbar.open('Menú actualizado', 'Cerrar');
        }
      });
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
    this.rolService.findAll().pipe(
      map(roles => [{ ... allFilterEnum }].concat(this.convertRolesToEnum(roles)))
    ).subscribe(roles => this.rolesOptions = roles);
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
