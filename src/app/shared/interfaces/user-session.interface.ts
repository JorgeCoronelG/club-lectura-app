import { Rol } from '@shared/models/role.model';

export interface UserSession {
  id: number;
  nombreCompleto: string;
  correo: string;
  token: string;
  rol: Rol;
}
