import { TableColumn } from '@shared/interfaces/table-column.interface';

export const myLoansTableColumns: TableColumn[] = [
  {
    label: 'Libro',
    property: 'libro',
    visible: true
  },
  {
    label: 'Fecha préstamo',
    property: 'fechaPrestamo',
    visible: true
  },
  {
    label: 'Fecha entrega estimada',
    property: 'fechaEntrega',
    visible: true
  },
  {
    label: 'Fecha entrega real',
    property: 'fechaRealEntrega',
    visible: true
  },
  {
    label: 'Estatus',
    property: 'estatusId',
    visible: true
  },
  {
    label: 'Multa',
    property: 'multa',
    visible: true,
  },
  {
    label: 'Estatus multa',
    property: 'estatus_multa',
    visible: true,
  }
];
