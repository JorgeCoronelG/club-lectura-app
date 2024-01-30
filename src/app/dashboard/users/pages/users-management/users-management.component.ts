import { Component, OnInit } from '@angular/core';
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
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogoOpcionService } from '@shared/services/catalogo-opcion.service';
import { forkJoin } from 'rxjs';
import { CatalogoEnum } from '@shared/enums/catalogo.enum';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { map } from 'rxjs/operators';
import { allFilterEnum } from '@shared/components/advanced-filter-table/advanced-filter-table.data';

@Component({
  selector: 'app-users-management',
  standalone: true,
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
  ],
  templateUrl: './users-management.component.html',
  styles: [],
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
  dataSource!: MatTableDataSource<Partial<Usuario>>;
  columns: TableColumn[] = [
    {
      label: 'Nombre completo',
      property: 'nombreCompleto',
      visible: true
    },
    {
      label: 'Correo electrónico',
      property: 'correo',
      visible: true
    },
    {
      label: 'Fecha nacimiento',
      property: 'fechaNacimiento',
      visible: true
    },
    {
      label: 'Género',
      property: 'sexoId',
      visible: true
    },
    {
      label: 'Estatus',
      property: 'estatusId',
      visible: true,
    },
    {
      label: 'Rol',
      property: 'rolId',
      visible: true
    },
    {
      label: 'Acciones',
      property: 'actions',
      visible: true
    }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  genreOptions: CatalogoOpcion[] = [];
  statusUserOptions: CatalogoOpcion[] = [];

  constructor(
    private catalogoOpcionService: CatalogoOpcionService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Partial<Usuario>>();

    this.dataSource.data = [
      {
        id: 1,
        nombreCompleto: 'Laura Hernández Pérez',
        correo: 'laura@gmail.com',
        fechaNacimiento: new Date(2005, 1, 20),
        sexoId: 2,
        estatusId: 1,
        rolId: 2
      },
      {
        id: 2,
        nombreCompleto: 'Nancy Oviedo López',
        correo: 'nancy.oviedo@gmail.com',
        fechaNacimiento: new Date(1985, 4, 13),
        sexoId: 2,
        estatusId: 1,
        rolId: 1
      },
      {
        id: 3,
        nombreCompleto: 'José Juan Ramírez Montoya',
        correo: 'juan.ramirez@gmail.com',
        fechaNacimiento: new Date(2006, 11, 7),
        sexoId: 1,
        estatusId: 1,
        rolId: 3
      }
    ];

    this.getEnums();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  updateUser(user: Usuario): void {
    console.log(user);
  }

  deleteUser(id: number): void {
    console.log(id);
  }

  toggleColumnVisibility(column: TableColumn) {
    column.visible = !column.visible;
  }

  getEnums(): void {
    forkJoin([
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.SEXO),
      this.catalogoOpcionService.findByCatalogoId(CatalogoEnum.ESTATUS_USUARIO)
    ]).pipe(
      map(([genreOptions, statusUserOptions]) => {
        return [
          [{ ... allFilterEnum }].concat([... genreOptions]),
          [{ ... allFilterEnum }].concat([... statusUserOptions])
        ];
      })
    ).subscribe(([genreOptions, statusUserOptions]) => {
      this.genreOptions = genreOptions;
      this.statusUserOptions = statusUserOptions;
    });
  }
}
