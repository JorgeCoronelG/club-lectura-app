import { Meta } from '@shared/interfaces/pagination-response.interface';
import { Sort } from '@angular/material/sort';
import { Filter } from '@shared/interfaces/filters-http.interface';

export interface ManagmentMethods {
  /**
   * Cuando la paginación de la tabla cambia
   *
   * @param meta
   */
  paginationChange(meta: Meta): void;

  /**
   * Cuando el ordenamiento de la tabla cambia
   *
   * @param sortState
   */
  sortChange(sortState: Sort): void;

  /**
   * Se agrega un nuevo filtro de búsqueda
   *
   * @param filter
   */
  addFilter(filter: Filter): void;

  /**
   * Se obtiene los datos de la tabla
   */
  getData(): void;
}
