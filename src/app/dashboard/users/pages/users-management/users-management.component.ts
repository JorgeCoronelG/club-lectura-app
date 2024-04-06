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
import { OptionCatalogService } from '@shared/services/option-catalog.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { userTableColumns } from './users-managment-table-columns.data';
import { Meta, PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { toggleColumnVisibility, visibleColumns } from '@shared/utils/table.utils';
import { UserService } from '@shared/services/user.service';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Sort } from '@angular/material/sort';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { trackById } from '@shared/utils/track-by';
import { RolService } from '@shared/services/rol.service';
import { Rol } from '@shared/models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateUpdateComponent } from '../../components/user-create-update/user-create-update.component';
import { ManagmentMethods } from '@shared/interfaces/managment-methods.interface';
import { ConfirmDeleteComponent } from '@shared/components/confirm-delete/confirm-delete.component';
import { AlertNotificationService } from '@shared/services/alert-notification.service';

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
export class UsersManagementComponent implements OnInit, ManagmentMethods {
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

  trackById = trackById;
  visibleColumns = visibleColumns;
  toggleColumnVisibility = toggleColumnVisibility;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private alertNotificationService: AlertNotificationService,
    private catalogoOpcionService: OptionCatalogService,
    private userService: UserService,
    private rolService: RolService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>();

    this.getFiltersTable();
    this.getData();
  }

  createUser(): void {
    this.dialog.open(UserCreateUpdateComponent, {
      panelClass: 'w-11/12',
    })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.alertNotificationService.success('Registro creado');
          this.getData();
        }
      });
  }

  updateUser(id: number): void {
    this.userService.show(id).subscribe(user => {
      this.dialog.open(UserCreateUpdateComponent, {
        data: user,
        panelClass: 'w-11/12',
      })
        .afterClosed()
        .subscribe((updated) => {
          if (updated) {
            this.alertNotificationService.success('Registro actualizado');
            this.getData();
          }
        });
    });
  }

  deleteUser(id: number): void {
    this.dialog.open(ConfirmDeleteComponent)
      .afterClosed()
      .pipe(
        switchMap(confirm => (confirm) ? this.userService.delete(id): of(false))
      )
      .subscribe(confirm => {
        if (confirm) {
          this.alertNotificationService.success('Registro eliminado');
          this.getData();
        }
      });
  }

  paginationChange(meta: Meta): void {
    this.userResponse!.meta = meta;
    this.getData();
  }

  sortChange(sortState: Sort): void {
    this.filtersTable.setOrderBy(sortState);
    this.getData();
  }

  addFilter(filter: Filter): void {
    this.filtersTable.addFilter(filter);
    this.getData();
  }

  getData(): void {
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
        estatus: true,
        claseCss: null,
      };

      return opcion;
    });
  }
}
