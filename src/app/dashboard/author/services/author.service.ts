import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../../core/models/list-response";
import { SingleResponse } from "../../../core/models/single-response";
import { EnvironmentService } from "../../../core/services/environment.service";
import { HttpFunctions } from "../../../core/utils/http-functions";
import { AuthorModel } from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _baseUrl = '/authors';

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(sort: string, itemsPerPage: number, page: number, search: string): Observable<ListResponse<AuthorModel>> {
    const params = HttpFunctions.getPaginateParams(sort, itemsPerPage, page, search);

    return this.http.get<ListResponse<AuthorModel>>(this.url, { params });
  }

  public findById(id: number): Observable<AuthorModel> {
    const url = `${this.url}/${id}`;
    return this.http.get<SingleResponse<AuthorModel>>(url)
      .pipe(
        map(res => res.data!)
      );
  }

  public store(author: AuthorModel): Observable<AuthorModel> {
    return this.http.post<SingleResponse<AuthorModel>>(this.url, author)
      .pipe(
        map(res => res.data!)
      );
  }

  public update(author: AuthorModel): Observable<AuthorModel> {
    const url = `${this.url}/${author.id}`;
    return this.http.put<SingleResponse<AuthorModel>>(url, author)
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
