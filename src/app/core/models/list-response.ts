export interface ListResponse<Type> {
  data?: Type[];
  links?: Links;
  meta?: Meta;
}

interface Links {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}

interface Meta {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
}
