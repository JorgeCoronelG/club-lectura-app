import { TableColumn } from '@shared/interfaces/table-column.interface';

export const authorsTableColumns: TableColumn[] = [
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
