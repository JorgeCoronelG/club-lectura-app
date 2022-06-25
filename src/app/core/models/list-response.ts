export interface ListResponse<Type> {
  data: Type[];
  links: Links;
  meta: Meta;
}

export interface Links {
  first: string;
  last?: string;
  prev: string;
  next: string;
}

export interface Meta {
  currentPage: number;
  from?: number;
  lastPage: number;
  perPage: number;
  to?: number;
  total: number;
}
