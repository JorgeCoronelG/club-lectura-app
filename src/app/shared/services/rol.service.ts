import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Rol } from '@shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _baseUrl = 'roles/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  findAll(): Observable<Rol[]> {
    const url = `${this.url}find-all`;
    return this.http.get<Rol[]>(url);
  }
}
