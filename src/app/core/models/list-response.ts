export interface ListResponse<Type> {
  data?: Type[];
  code?: number;
  error?: string | Map<string, string[]>;
}
