import { TableColumn } from '@shared/interfaces/table-column.interface';

export const libraryTableColumns: TableColumn[] = [
  {
    label: 'Clave',
    property: 'clave',
    visible: true,
  },
  {
    label: 'Título',
    property: 'titulo',
    visible: true,
  },
  {
    label: 'N° Páginas',
    property: 'numPaginas',
    visible: true,
  },
  {
    label: 'Estado físico',
    property: 'estadoFisicoId',
    visible: true,
  },
  {
    label: 'Idioma',
    property: 'idiomaId',
    visible: true,
  },
  {
    label: 'Estatus',
    property: 'estatusId',
    visible: true,
  },
  {
    label: 'Acciones',
    property: 'actions',
    visible: true
  },
];
