import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Prestamo } from '@shared/models/prestamo.model';

export interface Multa {
  id: number;
  costo: number;
  estatusId: number;
  estatus: CatalogoOpcion;
  prestamoId: number;
  prestamo: Prestamo;
}
