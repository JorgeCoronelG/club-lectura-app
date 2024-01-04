import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _baseUrl = 'navigation';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  hasPermission(pathRoute: string): Observable<boolean> {
    const url = `${this.url}/has-permission`;
    const params = new HttpParams()
      .append('pathRoute', pathRoute);

    return this.http.get<{hasPermission: boolean}>(url, { params }).pipe(
      map(({ hasPermission }) => hasPermission)
    );
  }
}
