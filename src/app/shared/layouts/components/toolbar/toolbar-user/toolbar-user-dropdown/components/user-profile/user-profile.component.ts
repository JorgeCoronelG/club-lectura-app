import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '@shared/models/usuario.model';
import { DatePipe, NgIf } from '@angular/common';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {}

  get typeUser(): typeof TypeUserEnum {
    return TypeUserEnum;
  }
}
