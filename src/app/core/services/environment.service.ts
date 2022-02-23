import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly _environment: string = environment.baseUrl;
  private readonly _api: string = environment.api;

  get environment(): string {
    return this._environment;
  }

  get environmentApi(): string {
    return this._environment + this._api;
  }
}
