import { Usuario } from '@shared/models/usuario.model';
import { Libro } from '@shared/models/libro.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Multa } from '@shared/models/multa.model';

export interface Prestamo {
  id: number;
  fechaPrestamo: Date | string;
  fechaEntrega: Date | string;
  fechaEntregaReal: Date | string;
  usuarioId: number;
  usuario: Usuario;
  libros: Libro[] | Partial<Libro>[];
  estatusId: number;
  estatus: CatalogoOpcion;
  multa?: Multa;
}
