import { Pipe, PipeTransform } from '@angular/core';
import { UserSession } from "../../core/models/user-session";

@Pipe({
  name: 'completeName'
})
export class CompleteNamePipe implements PipeTransform {

  transform(user: UserSession): string {
    const { name, paternalSurname, maternalSurname } = user;
    return `${name} ${paternalSurname} ${maternalSurname}`;
  }

}
