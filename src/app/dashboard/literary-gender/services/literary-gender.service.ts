import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../../core/models/list-response";
import { SingleResponse } from "../../../core/models/single-response";
import { EnvironmentService } from "../../../core/services/environment.service";
import { getPaginateParams } from "../../../core/utils/http-functions";
import { LiteraryGenderModel } from "../models/literary-gender.model";

@Injectable({
  providedIn: 'root'
})
export class LiteraryGenderService {
  private _baseUrl = '/literary-genders';

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(sort: string, itemsPerPage: number, page: number, search: string): Observable<ListResponse<LiteraryGenderModel>> {
    const params = getPaginateParams(sort, itemsPerPage, page, search);

    return this.http.get<ListResponse<LiteraryGenderModel>>(this.url, { params });
  }

  public findById(id: number): Observable<LiteraryGenderModel> {
    const url = `${this.url}/${id}`;
    return this.http.get<SingleResponse<LiteraryGenderModel>>(url)
      .pipe(
        map(res => res.data!)
      );
  }

  public store(literaryGender: LiteraryGenderModel): Observable<LiteraryGenderModel> {
    return this.http.post<SingleResponse<LiteraryGenderModel>>(this.url, literaryGender)
      .pipe(
        map(res => res.data!)
      );
  }

  public update(literaryGender: LiteraryGenderModel): Observable<LiteraryGenderModel> {
    const url = `${this.url}/${literaryGender.id}`;
    return this.http.put<SingleResponse<LiteraryGenderModel>>(url, literaryGender)
      .pipe(
        map(res => res.data!)
      );
  }

  public delete(id: number): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe(
      map(() => true)
    );
  }
}
