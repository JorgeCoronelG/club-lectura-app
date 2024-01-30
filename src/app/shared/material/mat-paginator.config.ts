import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class MatPaginatorConfig implements MatPaginatorIntl {
  readonly changes: Subject<void>;

  constructor() {
    this.changes = new Subject<void>();
  }

  itemsPerPageLabel = 'Registros por página';
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';
  lastPageLabel = 'Última página';
  firstPageLabel = 'Primera página';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 - 1 de 0 registros`;
    }

    const amountPages = Math.ceil(length / pageSize);
    let totalLength: string;

    if (length === 1) {
      totalLength = '1 registro';
    } else {
      totalLength = `${length.toLocaleString('en-US')} registros`;
    }

    return `Página ${page + 1} - ${amountPages} de ${totalLength}`;
  }
}
