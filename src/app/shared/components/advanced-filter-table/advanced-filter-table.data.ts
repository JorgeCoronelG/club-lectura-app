import { AdvancedFilterTable } from '@shared/components/advanced-filter-table/advanced-filter-table.model';
import { OperatorsSqlEnum } from '@shared/enums/operators-sql.enum';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export const typeText: AdvancedFilterTable[] = [
  { label: 'Contiene', operatorSql: OperatorsSqlEnum.CONTAIN },
  { label: 'No contiene', operatorSql: OperatorsSqlEnum.NOT_CONTAIN },
  { label: 'Igual', operatorSql: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', operatorSql: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Empieza con', operatorSql: OperatorsSqlEnum.STARTS_WITH },
  { label: 'Termina con', operatorSql: OperatorsSqlEnum.ENDS_WITH },
  { label: 'No nulo', operatorSql: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', operatorSql: OperatorsSqlEnum.IS_NULL },
];

export const typeNumber: AdvancedFilterTable[] = [
  { label: 'Igual', operatorSql: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', operatorSql: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Mayor que', operatorSql: OperatorsSqlEnum.GREATER_THAN },
  { label: 'Mayor o igual que', operatorSql: OperatorsSqlEnum.GREATER_THAN_OR_EQUAL },
  { label: 'Menor que', operatorSql: OperatorsSqlEnum.LESS_THAN },
  { label: 'Menor o igual que', operatorSql: OperatorsSqlEnum.LESS_THAN_OR_EQUAL },
  { label: 'No nulo', operatorSql: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', operatorSql: OperatorsSqlEnum.IS_NULL },
];

export const typeDate: AdvancedFilterTable[] = [
  { label: 'Igual', operatorSql: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', operatorSql: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Mayor que', operatorSql: OperatorsSqlEnum.GREATER_THAN },
  { label: 'Mayor o igual que', operatorSql: OperatorsSqlEnum.GREATER_THAN_OR_EQUAL },
  { label: 'Menor que', operatorSql: OperatorsSqlEnum.LESS_THAN },
  { label: 'Menor o igual que', operatorSql: OperatorsSqlEnum.LESS_THAN_OR_EQUAL },
  { label: 'No nulo', operatorSql: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', operatorSql: OperatorsSqlEnum.IS_NULL },
];

export const allFilterEnum: CatalogoOpcion = {
  id: 0,
  catalogoId: 0,
  estatus: true,
  opcionId: 0,
  valor: 'Todos'
};
