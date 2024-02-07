import { TableColumn } from '@shared/interfaces/table-column.interface';

export const userTableColumns: TableColumn[] = [
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
    label: 'Fecha nacimiento',
    property: 'fechaNacimiento',
    visible: true
  },
  {
    label: 'Género',
    property: 'sexoId',
    visible: true
  },
  {
    label: 'Estatus',
    property: 'estatusId',
    visible: true,
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
