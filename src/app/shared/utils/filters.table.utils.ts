import { Filter, FiltersHttp } from '@shared/interfaces/filters-http.interface';
import { Sort } from '@angular/material/sort';
import { getSort } from '@shared/utils/http.utils';
import { currentPageDefault, paginationSizeDefault } from '@shared/types/pagination.type';
import { Meta } from '@shared/interfaces/pagination-response.interface';
import { OperatorsSqlEnum } from '@shared/enums/operators-sql.enum';

export class FiltersTable {
  private _filters: Filter[] = [];
  private _defaultOrderBy: string = '-id';
  private _orderBy: string = this._defaultOrderBy;
  private _currentPage: number = currentPageDefault;
  private _pageSize: number = paginationSizeDefault;

  get filtersHttp(): FiltersHttp {
    return { filters: [... this._filters] };
  }

  get orderBy(): string {
    return this._orderBy;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get searchQuery(): string | null {
    return (this._filters.length === 0)
      ? ''
      : JSON.stringify(this.filtersHttp);
  }

  setOrderBy(sortState: Sort): void {
    const sort = getSort(sortState);
    this._orderBy = (sort.length === 0) ? this._defaultOrderBy : sort;
  }

  addFilter(newFilter: Filter): void {
    const filters = this._filters.filter(filter => filter.field !== newFilter.field);

    this.clearFilters();

    this._filters = filters;
    if (
      newFilter.value ||
      newFilter.operator === OperatorsSqlEnum.IS_NULL ||
      newFilter.operator === OperatorsSqlEnum.NOT_NULL
    ) {
      this._filters = this._filters.concat({ ...newFilter });
    }
  }

  clearFilters(): void {
    this._filters = [];
  }

  setPaginationOfMeta(meta?: Meta): void {
    if (meta) {
      const { currentPage, perPage } = meta;
      this._currentPage = currentPage;
      this._pageSize = perPage;
    }
  }
}
