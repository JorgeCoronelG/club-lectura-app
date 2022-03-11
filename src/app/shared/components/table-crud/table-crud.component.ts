import { Component, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss']
})
export class TableCrudComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  @Input('columns')
  public displayedColumns: string[] = [];
  @Input('data')
  public dataSource!: MatTableDataSource<any>;
  @Input('titles')
  public columnsTitle!: any;

  @Output()
  public orderBy: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public announceSortChange(sortState: Sort): void {
    let sort = '';
    if (sortState.direction === 'asc') {
      sort = sortState.active;
    } else if (sortState.direction === 'desc') {
      sort = `-${sortState.active}`;
    }

    this.orderBy.emit(sort);
  }

  public edit(id: number): void {
    this.onEdit.emit(id);
  }

  public delete(id: number): void {
    this.onDelete.emit(id);
  }
}
