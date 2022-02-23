export interface SingleResponse<Type> {
  data?: Type;
  code?: number;
  error?: string | Map<string, string[]>;
}
