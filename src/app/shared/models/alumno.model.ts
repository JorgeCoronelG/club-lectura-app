import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Alumno {
  usuarioId: number;
  grupo: string;
  turnoId: number;
  turno?: CatalogoOpcion;
}
