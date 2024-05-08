import { Autor } from '@shared/models/autor.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Genero } from '@shared/models/genero.model';

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
  imagenFile?: File;
  numCopia: number;
  autores: Autor[] | Partial<Autor>[];
  estadoFisicoId: number;
  estadoFisico: CatalogoOpcion;
  idiomaId: number;
  idioma: CatalogoOpcion;
  estatusId: number;
  estatus: CatalogoOpcion;
  generoId: number;
  genero: Genero;
  donacionId?: number;
}
