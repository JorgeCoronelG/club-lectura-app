import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { Meta } from "../../../core/models/list-response";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: ['']
})
export class PaginatorComponent {
  @Input()
  public pageSizeOptions!: number[];
  @Input()
  set meta(meta: Meta) {
    this._meta = meta;
  }

  @Output()
  public onChanges: EventEmitter<Meta> = new EventEmitter<Meta>();

  public _meta!: Meta;

  public pageChange(pageEvent: PageEvent) {
    let meta = { ...this._meta };

    meta.currentPage = pageEvent.pageIndex + 1;
    meta.perPage = pageEvent.pageSize;

    this.onChanges.emit(meta);
  }
}
