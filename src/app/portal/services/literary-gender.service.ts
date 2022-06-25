import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../core/models";
import { EnvironmentService } from "../../core/services/environment.service";
import { LiteraryGenderModel } from "../models/literary-gender.model";

@Injectable({
  providedIn: 'root'
})
export class LiteraryGenderService {
  private _baseUrl: string = '/literary-genders';

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public findAll(): Observable<LiteraryGenderModel[]> {
    const url = `${this.url}/find-all`;
    return this.http.get<ListResponse<LiteraryGenderModel>>(url)
      .pipe(
        map(res => res.data)
      );
  }
}
