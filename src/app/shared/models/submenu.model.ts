export interface Submenu {
  id: number;
  pathRuta: string;
  etiqueta: string;
  orden: number;
  menuId: number;
  estatus: boolean;
  isSelected?: boolean;
}
