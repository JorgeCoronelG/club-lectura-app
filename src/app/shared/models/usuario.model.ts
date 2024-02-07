import { Rol } from '@shared/models/role.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';
import { Externo } from '@shared/models/externo.model';
import { Escolar } from '@shared/models/escolar.model';
import { Alumno } from '@shared/models/alumno.model';

export interface Usuario {
  id: number;
  nombreCompleto: string;
  correo: string;
  contrasenia: string;
  telefono: string;
  fechaNacimiento: Date;
  sexoId: number;
  sexo: CatalogoOpcion;
  estatusId: number;
  estatus: CatalogoOpcion;
  rolId: number;
  rol: Rol;
  rememberMe?: boolean;
  contraseniaActual?: string;
  externo?: Externo;
  escolar?: Escolar;
  alumno?: Alumno;
}
