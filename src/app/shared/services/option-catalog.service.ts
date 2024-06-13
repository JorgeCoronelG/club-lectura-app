import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

@Injectable({
  providedIn: 'root'
})
export class OptionCatalogService {
  private _baseUrl = 'options-catalog/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  findByCatalogoId(catalogoId: number, omitOptions: number[] = []): Observable<CatalogoOpcion[]> {
    const url = `${this.url}catalog-id/${catalogoId}`;

    if (omitOptions.length > 0) {
      const params = new HttpParams().append('omit_options', omitOptions.join(','));
      return this.http.get<CatalogoOpcion[]>(url, { params });
    }

    return this.http.get<CatalogoOpcion[]>(url);
  }
}
