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
export class BookService {
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

  findById(id: number): Observable<Libro> {
    const url = `${this.url}${id}`;
    return this.http.get<Libro>(url);
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.url}${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => true)
    );
  }

  updateImage(id: number, image: File): Observable<void> {
    const data = new FormData();
    data.append('imagenFile', image);
    data.append('_method', 'PATCH');

    const url = `${this.url}image/${id}`;
    return this.http.post<void>(url, data);
  }

  store(data: Partial<Libro>): Observable<Libro> {
    const formData = new FormData();
    formData.append('titulo', data.titulo!);
    formData.append('isbn', data.isbn!);
    formData.append('numPaginas', data.numPaginas!.toString());
    formData.append('precio', data.precio!.toString());
    formData.append('edicion', data.edicion!.toString());
    formData.append('imagenFile', data.imagenFile!);
    formData.append('numCopia', data.numCopia!.toString());
    formData.append('estadoFisicoId', data.estadoFisicoId!.toString());
    formData.append('idiomaId', data.idiomaId!.toString());
    formData.append('estatusId', data.estatusId!.toString());
    formData.append('generoId', data.generoId!.toString());
    data.autores!.forEach(author => {
      formData.append('autores[][id]', author.id!.toString());
    });

    if (data.resenia) {
      formData.append('resenia', data.resenia);
    }

    return this.http.post<Libro>(this.url, formData);
  }

  update(data: Partial<Libro>, id: number): Observable<Libro> {
    const url = `${this.url}${id}`;
    return this.http.put<Libro>(url, data);
  }

  findAllLibraryPaginated(filtersTable: FiltersTable)
    : Observable<PaginationResponse<Libro>> {
    const url = `${this.url}library`;
    const params = getPaginateParams(
      filtersTable.orderBy,
      filtersTable.pageSize,
      filtersTable.currentPage,
      filtersTable.searchQuery
    );

    return this.http.get<PaginationResponse<Libro>>(url, { params });
  }
}
