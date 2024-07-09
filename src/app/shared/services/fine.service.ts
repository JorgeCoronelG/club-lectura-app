import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FineService {
  private _baseUrl = 'fines/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  paid(id: number): Observable<void> {
    const url = `${this.url}paid/${id}`;
    return this.http.patch<void>(url, null);
  }
}
