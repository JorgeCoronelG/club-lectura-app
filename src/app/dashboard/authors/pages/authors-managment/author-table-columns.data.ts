import { TableColumn } from '@shared/interfaces/table-column.interface';

export const authorTableColumns: TableColumn[] = [
  {
    label: 'Nombre',
    property: 'nombre',
    visible: true
  },
  {
    label: 'Acciones',
    property: 'actions',
    visible: true
  }
];
