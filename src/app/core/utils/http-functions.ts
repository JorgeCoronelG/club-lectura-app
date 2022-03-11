import { HttpParams } from "@angular/common/http";

export class HttpFunctions {
  public static getPaginateParams(sort: string, itemsPerPage: number, page: number, search: string|null): HttpParams {
    return new HttpParams()
      .append('sort', sort)
      .append('per_page', itemsPerPage)
      .append('page', page)
      .append('q', (search === null) ? '' : encodeURI(search));
  }
}
