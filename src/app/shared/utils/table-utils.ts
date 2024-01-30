import { TableColumn } from '@shared/interfaces/table-column.interface';

export const visibleColumns = (columns: TableColumn[]): string[] => {
  return columns
    .filter((column) => column.visible)
    .map((column) => column.property);
}
