import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoOpcionService {
  private _baseUrl = 'options-catalog/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  findByCatalogoId(catalogoId: number): Observable<CatalogoOpcion[]> {
    const url = `${this.url}catalog-id/${catalogoId}`;
    return this.http.get<CatalogoOpcion[]>(url);
  }
}
