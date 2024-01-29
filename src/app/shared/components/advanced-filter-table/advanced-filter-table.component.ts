import { Component, Input } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { AdvancedFilterTable } from '@shared/components/advanced-filter-table/advanced-filter-table.model';
import { typeDate, typeNumber, typeText } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TableColumnType } from '@shared/types/table-column.type';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advanced-filter-table',
  standalone: true,
  imports: [
    MaterialModule,
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
  ],
  templateUrl: './advanced-filter-table.component.html',
  styles: []
})
export class AdvancedFilterTableComponent {
  @Input({ required: true }) type!: TableColumnType;
  @Input() enumValues: CatalogoOpcion[] = [];

  optionSelectedIndex = 0;

  get menu(): AdvancedFilterTable[] {
    if (this.type === 'text') {
      return typeText;
    }

    if (this.type === 'number') {
      return typeNumber;
    }

    if (this.type === 'date') {
      return typeDate;
    }

    return [];
  }

  get enumMenu(): CatalogoOpcion[] {
    return [... this.enumValues];
  }

  searchOption(data: AdvancedFilterTable, index: number): void {
    this.optionSelectedIndex = index;
    console.log(data);
  }

  searchOptionEnum(data: Partial<CatalogoOpcion>, index: number): void {
    console.log(data);
  }
}
