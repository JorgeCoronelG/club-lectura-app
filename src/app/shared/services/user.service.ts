import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '@shared/models/usuario.model';
import { map } from 'rxjs/operators';
import { FiltersTable } from '@shared/utils/filters.table.utils';
import { PaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { getPaginateParams } from '@shared/utils/http.utils';

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

  update(data: Usuario, id: number): Observable<Usuario> {
    const url = `${this.url}/${id}`;
    return this.http.put<Usuario>(url, data);
  }

  show(id: number): Observable<Usuario> {
    const url = `${this.url}/${id}`;
    return this.http.get<Usuario>(url);
  }

  delete(id: number): Observable<boolean> {
    const url = this.url + id;
    return this.http.delete<void>(url).pipe(
      map(() => true)
    );
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
}
