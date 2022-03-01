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

    meta.current_page = pageEvent.pageIndex + 1;
    meta.per_page = pageEvent.pageSize;

    this.onChanges.emit(meta);
  }
}
