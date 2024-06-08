import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Donacion } from '@shared/models/donacion.model';
import { StoreDonation } from '../../dashboard/donations/interfaces/store-donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private _baseUrl = 'donations/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  store(data: StoreDonation): Observable<Donacion> {
    return this.http.post<Donacion>(this.url, data);
  }
}
