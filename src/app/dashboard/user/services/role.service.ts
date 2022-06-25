import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../../core/models";
import { EnvironmentService } from "../../../core/services/environment.service";
import { RoleModel } from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _baseUrl = '/roles';

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(): Observable<RoleModel[]> {
    return this.http.get<ListResponse<RoleModel>>(`${this.url}/find-all`)
      .pipe(
        map(res => res.data)
      );
  }
}
