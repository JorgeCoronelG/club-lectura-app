import { AdvancedFilterTable } from '@shared/components/advanced-filter-table/advanced-filter-table.model';
import { OperatorsSqlEnum } from '@shared/enums/operators-sql.enum';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export const typeText: AdvancedFilterTable[] = [
  { label: 'Contiene', value: OperatorsSqlEnum.CONTAIN },
  { label: 'No contiene', value: OperatorsSqlEnum.NOT_CONTAIN },
  { label: 'Igual', value: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', value: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Empieza con', value: OperatorsSqlEnum.STARTS_WITH },
  { label: 'Termina con', value: OperatorsSqlEnum.ENDS_WITH },
  { label: 'No nulo', value: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', value: OperatorsSqlEnum.IS_NULL },
];

export const typeNumber: AdvancedFilterTable[] = [
  { label: 'Igual', value: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', value: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Mayor que', value: OperatorsSqlEnum.GREATER_THAN },
  { label: 'Mayor o igual que', value: OperatorsSqlEnum.GREATER_THAN_OR_EQUAL },
  { label: 'Menor que', value: OperatorsSqlEnum.LESS_THAN },
  { label: 'Menor o igual que', value: OperatorsSqlEnum.LESS_THAN_OR_EQUAL },
  { label: 'No nulo', value: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', value: OperatorsSqlEnum.IS_NULL },
];

export const typeDate: AdvancedFilterTable[] = [
  { label: 'Igual', value: OperatorsSqlEnum.EQUAL },
  { label: 'No Igual', value: OperatorsSqlEnum.NOT_EQUAL },
  { label: 'Mayor que', value: OperatorsSqlEnum.GREATER_THAN },
  { label: 'Mayor o igual que', value: OperatorsSqlEnum.GREATER_THAN_OR_EQUAL },
  { label: 'Menor que', value: OperatorsSqlEnum.LESS_THAN },
  { label: 'Menor o igual que', value: OperatorsSqlEnum.LESS_THAN_OR_EQUAL },
  { label: 'No nulo', value: OperatorsSqlEnum.NOT_NULL },
  { label: 'Es nulo', value: OperatorsSqlEnum.IS_NULL },
];

export const allFilterEnum: CatalogoOpcion = {
  id: 0,
  catalogoId: 0,
  estatus: true,
  opcionId: 0,
  valor: 'Todos'
};
