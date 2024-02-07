import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Escolar {
  usuarioId: number;
  matricula: string;
  tipoId: number;
  tipo?: CatalogoOpcion;
}
