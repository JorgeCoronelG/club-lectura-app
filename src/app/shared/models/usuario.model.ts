import { Rol } from '@shared/models/role.model';
import { CatalogoOpcion } from '@shared/models/catalogo-opcion.model';

export interface Usuario {
  id?: number;
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
}
