import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Prestamo } from '@shared/models/prestamo.model';
import { Observable } from 'rxjs';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams } from '@shared/utils/http.utils';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private _baseUrl = 'loans/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  store(data: Partial<Prestamo>): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.url, data);
  }

  findAllPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Prestamo>> {
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Prestamo>>(this.url, { params });
  }

  show(id: number): Observable<Prestamo> {
    const url = `${this.url}${id}`;
    return this.http.get<Prestamo>(url);
  }

  deliver(id: number, data: Partial<Prestamo>): Observable<void> {
    const url = `${this.url}delivered/${id}`;
    return this.http.patch<void>(url, data);
  }

  findAllByReaderPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Prestamo>> {
    const url = `${this.url}reader`;
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Prestamo>>(url, { params });
  }
}
