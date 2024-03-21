import { Autor } from '@shared/models/autor.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Libro {
  id: number;
  clave: string;
  isbn: string;
  titulo: string;
  resenia: string;
  numPaginas: number;
  precio: number;
  edicion: number;
  imagen: string;
  numCopia: number;
  autores: Autor[];
  estadoFisicoId: number;
  estadoFisico: CatalogoOpcion;
  idiomaId: number;
  idioma: CatalogoOpcion;
  estatusId: number;
  estatus: CatalogoOpcion;
  donacionId?: number;
}
