import { DonacionUsuario } from '@shared/models/donacion-usuario.model';
import { Usuario } from '@shared/models/usuario.model';
import { Libro } from '@shared/models/libro.model';

export interface StoreDonation {
  usuariosExistentes: UsuariosExistentes[];
  usuariosNuevos: Usuario[];
  libros: Libro[];
}

interface UsuariosExistentes {
  id: number;
  donacion: Pick<DonacionUsuario, 'referencia'>
}
