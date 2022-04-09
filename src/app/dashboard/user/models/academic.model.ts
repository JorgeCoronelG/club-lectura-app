import { TypeAcademicEnum } from "../enums/type-academic.enum";

export interface AcademicModel {
  registration: string;
  type: TypeAcademicEnum;
  userId: number;
}
