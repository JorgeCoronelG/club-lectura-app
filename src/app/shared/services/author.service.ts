import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '@shared/models/autor.model';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams } from '@shared/utils/http.utils';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _baseUrl = 'authors/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  store(data: Partial<Autor>): Observable<Autor> {
    return this.http.post<Autor>(this.url, data);
  }

  update(data: Autor, id: number): Observable<Autor> {
    const url = this.url + id;
    return this.http.put<Autor>(url, data);
  }

  show(id: number): Observable<Autor> {
    const url = this.url + id;
    return this.http.get<Autor>(url);
  }

  delete(id: number): Observable<boolean> {
    const url = this.url + id;
    return this.http.delete<void>(url).pipe(
      map(() => true)
    );
  }

  findAllPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Autor>> {
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Autor>>(this.url, { params });
  }
}
