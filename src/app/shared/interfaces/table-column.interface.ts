import { TableColumnType } from '@shared/types/table-column.type';

export interface TableColumn<T> {
  label: string;
  property: string;
  type?: TableColumnType;
  visible?: boolean;
  cssClasses?: string[];
}
