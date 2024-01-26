import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-autors-managment',
  standalone: true,
  imports: [
    MaterialModule,
    VexBreadcrumbsComponent,
    VexPageLayoutComponent,
    VexPageLayoutContentDirective,
    VexPageLayoutHeaderDirective,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    AdvancedFilterTableComponent
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
  dataSource!: MatTableDataSource<Autor>;
  columns: TableColumn<Autor>[] = [
    {
      label: 'Nombre',
      property: 'nombre',
      type: 'text',
      visible: true
    },
    {
      label: 'Actions',
      property: 'actions',
      type: 'button',
      visible: true
    }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.dataSource.data = [
      { id: 1, nombre: 'Dross' },
      { id: 2, nombre: 'Jordi Wild' },
      { id: 3, nombre: 'E.L. James' },
      { id: 4, nombre: 'Sthephen King' },
      { id: 5, nombre: 'John Green' }
    ];
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  updateAuthor(author: Autor): void {
    console.log(author);
  }

  deleteAuthor(id: number): void {
    console.log(id);
  }
}
