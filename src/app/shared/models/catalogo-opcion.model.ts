import { Catalogo } from '@shared/models/catalogo.model';

export interface CatalogoOpcion {
  id: number;
  opcionId: number;
  catalogoId: number;
  catalogo?: Catalogo;
  valor: string;
  claseCss: string | null;
  estatus: boolean;
}
