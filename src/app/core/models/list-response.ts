export interface ListResponse<Type> {
  data?: Type[];
  links?: Links;
  meta?: Meta;
}

export interface Links {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}

export interface Meta {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
}
