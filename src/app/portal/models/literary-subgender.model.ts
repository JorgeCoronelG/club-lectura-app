import { LiteraryGenderModel } from "./literary-gender.model";

export interface LiterarySubgenderModel {
  id: number;
  name: string;
  literaryGender?: LiteraryGenderModel;
}
