import { GenderEnum } from "../enums/gender.enum";
import { StatusUserEnum } from "../enums/status-user.enum";
import { AcademicModel } from "./academic.model";
import { ExternalModel } from "./external.model";
import { RoleModel } from "./role.model";
import { StudentModel } from "./student.model";

export interface UserModel {
  id: number;
  completeName: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: GenderEnum;
  roles: RoleModel[];
  code?: string;
  photo?: string;
  status?: StatusUserEnum;
  emailVerifiedAt?: string;
  verified?: boolean;
  student?: StudentModel;
  academic?: AcademicModel;
  external?: ExternalModel;
}
