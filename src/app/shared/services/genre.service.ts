import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Genero } from '@shared/models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private _baseUrl = 'genres/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  findAll(): Observable<Genero[]> {
    const url = `${this.url}find-all`;
    return this.http.get<Genero[]>(url);
  }
}
