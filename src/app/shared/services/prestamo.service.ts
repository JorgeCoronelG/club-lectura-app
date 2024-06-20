import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams } from '@shared/utils/http.utils';
import { Prestamo } from '@shared/models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private _baseUrl = 'loans/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
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
}
