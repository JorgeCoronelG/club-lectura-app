import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Alumno {
  usuarioId: number;
  semestre: number;
  carreraId: number;
  carrera?: CatalogoOpcion;
  turnoId: number;
  turno?: CatalogoOpcion;
}
