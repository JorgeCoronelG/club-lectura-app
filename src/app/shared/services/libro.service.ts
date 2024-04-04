import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams } from '@shared/utils/http.utils';
import { Libro } from '@shared/models/libro.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private _baseUrl = 'books/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  findAllPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Libro>> {
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Libro>>(this.url, { params });
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.url}${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => true)
    );
  }
}
