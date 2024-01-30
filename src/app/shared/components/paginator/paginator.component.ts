import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { Meta } from '@shared/interfaces/pagination-response.interface';
import { PageEvent } from '@angular/material/paginator';
import { paginationSizeOptions } from '@shared/types/pagination.type';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './paginator.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input({ required: true })
  set meta(meta: Meta) {
    this._meta = meta;
  }

  @Output() onPaginationChange: EventEmitter<Meta> = new EventEmitter<Meta>();

  _meta!: Meta;
  paginationSizeOptions: number[] = paginationSizeOptions;

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  onPageChange(pageEvent: PageEvent): void {
    let meta: Meta = { ...this._meta };

    meta.currentPage = pageEvent.pageIndex + 1;
    meta.perPage = pageEvent.pageSize;

    this.cd.markForCheck();
    this.onPaginationChange.emit(meta);
  }
}
