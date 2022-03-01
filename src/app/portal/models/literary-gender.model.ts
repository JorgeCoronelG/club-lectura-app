import { LiterarySubgenderModel } from "./literary-subgender.model";

export interface LiteraryGenderModel {
  id: number;
  name: string;
  literarySubgenders?: LiterarySubgenderModel[];
}
