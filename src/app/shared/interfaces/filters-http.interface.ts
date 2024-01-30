import { OperatorsSqlEnum } from '@shared/enums/operators-sql.enum';

export interface FiltersHttp {
  filters: Filter[];
}

export interface Filter {
  field: string;
  value: string | number | Date;
  operator: OperatorsSqlEnum;
}
