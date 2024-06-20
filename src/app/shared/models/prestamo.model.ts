import { Usuario } from '@shared/models/usuario.model';
import { Libro } from '@shared/models/libro.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Prestamo {
  id: number;
  fechaPrestamo: Date | string;
  fechaEntrega: Date | string;
  fechaEntregaReal: Date | string;
  usuarioId: number;
  usuario: Usuario;
  libros: Libro[];
  estatusId: number;
  estatus: CatalogoOpcion;
}
