import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '@shared/models/usuario.model';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams, sortHttpParam } from '@shared/utils/http.utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = 'users/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  store(data: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, data);
  }

  update(data: Partial<Usuario>, id: number): Observable<Usuario> {
    const url = `${this.url}${id}`;
    return this.http.put<Usuario>(url, data);
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.url}${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => true)
    );
  }

  show(id: number): Observable<Usuario> {
    const url = `${this.url}${id}`;
    return this.http.get<Usuario>(url);
  }

  findAllPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Usuario>> {
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Usuario>>(this.url, { params });
  }

  findAll(sort?: string): Observable<Usuario[]> {
    const url = `${this.url}find-all`;
    const options = (sort)
      ? { params: sortHttpParam(sort) } : {};
    return this.http.get<Usuario[]>(url, options);
  }
}
