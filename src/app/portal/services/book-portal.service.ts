import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../core/models/list-response";
import { SingleResponse } from "../../core/models/single-response";
import { EnvironmentService } from "../../core/services/environment.service";
import { getPaginateParams } from "../../core/utils/http-functions";
import { BookPortalModel, MinMaxPagesModel } from "../models/book-portal.model";
import { LiteraryGenderModel } from "../models/literary-gender.model";
import { LiteraryGenderService } from "./literary-gender.service";

@Injectable({
  providedIn: 'root'
})
export class BookPortalService {
  private _baseUrl: string = '/portal/books';

  constructor(private environmentService: EnvironmentService,
              private literaryGenderService: LiteraryGenderService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(sort: string, itemsPerPage: number = 12, page: number = 1, search: string|null = null)
    : Observable<ListResponse<BookPortalModel>> {
    const params = getPaginateParams(sort, itemsPerPage, page, search);

    const url = `${this.url}`;
    return this.http.get<ListResponse<BookPortalModel>>(url, { params })
      .pipe(
        tap(res => res.data!)
      );
  }

  public findLatest(): Observable<BookPortalModel[]> {
    const url = `${this.url}/latest`;
    return this.http.get<ListResponse<BookPortalModel>>(url)
      .pipe(
        map(res => res.data!)
      )
  }

  public findMostRead(): Observable<BookPortalModel[]> {
    const url = `${this.url}/most-read`;
    return this.http.get<ListResponse<BookPortalModel>>(url)
      .pipe(
        map(res => res.data!)
      )
  }

  public findById(id: number): Observable<BookPortalModel> {
    const url = `${this.url}/detail/${id}`;
    return this.http.get<SingleResponse<BookPortalModel>>(url)
      .pipe(
        map(res => res.data!)
      );
  }

  public getMinMaxPages(): Observable<MinMaxPagesModel> {
    const url = `${this.url}/min-max-pages`;
    return this.http.get<SingleResponse<MinMaxPagesModel>>(url)
      .pipe(
        map(res => res.data!)
      );
  }

  public findAllIndex(): Observable<BookPortalModel[][]> {
    return forkJoin([this.findLatest(), this.findMostRead()]);
  }

  public combineRequestListBook(sort: string): Observable<[ListResponse<BookPortalModel>, MinMaxPagesModel, LiteraryGenderModel[]]> {
    return forkJoin([this.findAll(sort), this.getMinMaxPages(), this.literaryGenderService.findAll()]);
  }
}
