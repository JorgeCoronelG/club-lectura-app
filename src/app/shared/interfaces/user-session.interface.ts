import { Rol } from '@shared/interfaces/role.interface';

export interface UserSession {
  id: number;
  nombreCompleto: string;
  correo: string;
  token: string;
  rol: Rol;
}
