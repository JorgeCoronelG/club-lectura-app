import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { AdvancedFilterTable } from '@shared/components/advanced-filter-table/advanced-filter-table.model';
import { typeDate, typeNumber, typeText } from '@shared/components/advanced-filter-table/advanced-filter-table.data';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TableColumnType } from '@shared/types/table-column.type';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Filter } from '@shared/interfaces/filters-http.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperatorsSqlEnum } from '@shared/enums/operators-sql.enum';

@Component({
  selector: 'app-advanced-filter-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './advanced-filter-table.component.html',
  styles: []
})
export class AdvancedFilterTableComponent {
  @Input({ required: true }) type!: TableColumnType;
  @Input({ required: true }) field!: string;
  @Input() enumValues: CatalogoOpcion[] = [];

  @Output() onOptionFilterChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  input: FormControl<string | number | Date> = new FormControl();
  optionSelectedIndex = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) {}

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

  onClickInput(): void {
    this.searchOption(this.menu[this.optionSelectedIndex], this.optionSelectedIndex);
  }

  onDateChange(): void {
    this.searchOption(this.menu[this.optionSelectedIndex], this.optionSelectedIndex);
  }

  searchOption(data: AdvancedFilterTable, index: number): void {
    const filter: Filter = {
      field: this.field,
      value: this.input.value,
      operator: data.operatorSql
    };

    this.optionSelectedIndex = index;
    this.cd.markForCheck();
    this.onOptionFilterChange.emit(filter);
  }

  searchOptionEnum(data: CatalogoOpcion): void {
    const filter: Filter = {
      field: this.field,
      value: data.id,
      operator: OperatorsSqlEnum.EQUAL
    };

    this.cd.markForCheck();
    this.onOptionFilterChange.emit(filter);
  }
}
