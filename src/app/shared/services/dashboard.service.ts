import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CardInfo } from '../../dashboard/home/interfaces/card-info';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _baseUrl = 'dashboard/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  getStadistics(): Observable<CardInfo[]> {
    const url = `${this.url}stadistics`;
    return this.http.get<CardInfo[]>(url);
  }
}
