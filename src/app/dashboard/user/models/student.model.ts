import { TurnUserEnum } from "../enums/turn-user.enum";

export interface StudentModel {
  group: string;
  turn: TurnUserEnum;
  userId: number;
}
