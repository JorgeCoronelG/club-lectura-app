import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Prestamo } from '@shared/models/prestamo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private _baseUrl = 'loans/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  store(data: Partial<Prestamo>): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.url, data);
  }
}
