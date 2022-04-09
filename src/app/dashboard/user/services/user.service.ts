import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListResponse } from "../../../core/models/list-response";
import { EnvironmentService } from "../../../core/services/environment.service";
import { HttpFunctions } from "../../../core/utils/http-functions";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = '/users';

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(sort: string, itemsPerPage: number, page: number, search: string): Observable<ListResponse<UserModel>> {
    const params = HttpFunctions.getPaginateParams(sort, itemsPerPage, page, search);

    return this.http.get<ListResponse<UserModel>>(this.url, { params });
  }
}
