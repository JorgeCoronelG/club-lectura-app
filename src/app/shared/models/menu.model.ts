import { Submenu } from '@shared/models/submenu.model';

export interface Menu {
  id: number;
  pathRuta: string;
  etiqueta: string;
  icono: string;
  orden: number;
  estatus: boolean;
  rolid: number;
  isSelected?: boolean;
  submenu: Submenu[];
}
