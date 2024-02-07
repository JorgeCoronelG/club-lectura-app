import { TableColumn } from '@shared/interfaces/table-column.interface';

export const userPermissionTableColumns: TableColumn[] = [
  {
    label: 'Nombre completo',
    property: 'nombreCompleto',
    visible: true
  },
  {
    label: 'Correo electrónico',
    property: 'correo',
    visible: true
  },
  {
    label: 'Rol',
    property: 'rolId',
    visible: true
  },
  {
    label: 'Acciones',
    property: 'actions',
    visible: true
  }
];
