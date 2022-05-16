import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { ListResponse } from "../../../core/models/list-response";
import { EnvironmentService } from "../../../core/services/environment.service";
import { StatusUserEnum } from "../enums/status-user.enum";
import { getPaginateParams } from "../../../core/utils/http-functions";
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
    const params = getPaginateParams(sort, itemsPerPage, page, search);

    return this.http.get<ListResponse<UserModel>>(this.url, { params })
      .pipe(
        tap(res => {
          res.data?.forEach(this.transformInfo);
          return res;
        })
      );
  }

  public transformInfo(user: UserModel): void {
    switch (user.status) {
      case StatusUserEnum.Active:
        user.statusStr = StatusUserEnum.ActiveStr;
        break;
      case StatusUserEnum.Inactive:
        user.statusStr = StatusUserEnum.InactiveStr;
        break;
      case StatusUserEnum.Blocked:
        user.statusStr = StatusUserEnum.BlockedStr;
        break;
    }
  }
}
