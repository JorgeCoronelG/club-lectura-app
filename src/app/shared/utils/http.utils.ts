import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';

export const getPaginateParams = (sort: string, itemsPerPage: number, page: number, search: string | null)
  : HttpParams => {
  return new HttpParams()
    .append('sort', sort)
    .append('per_page', itemsPerPage)
    .append('page', page)
    .append('q', (search === null) ? '' : encodeURI(search));
}

export const getSort = (sortState: Sort): string =>  {
  if (sortState.direction === 'asc') {
    return convertCamelCaseToSnakeCase(sortState.active);
  } else if (sortState.direction === 'desc') {
    return `-${convertCamelCaseToSnakeCase(sortState.active)}`;
  } else {
    return '';
  }
}

export const sortHttpParam = (sort: string): HttpParams => {
  return new HttpParams().append('sort', sort);
}

export const disableSpinner = (): HttpParams => {
  return new HttpParams().append('disableSpinner', true);
}

const convertCamelCaseToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
