import { HttpParams } from "@angular/common/http";

export const getPaginateParams = (sort: string, itemsPerPage: number, page: number, search: string|null): HttpParams => {
  return new HttpParams()
    .append('sort', sort)
    .append('per_page', itemsPerPage)
    .append('page', page)
    .append('q', (search === null) ? '' : encodeURI(search));
}
