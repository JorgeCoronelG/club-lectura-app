import { Component, Inject, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormErrors } from "../../../../core/utils/form-errors";
import { phoneRegex, dateBeforeNow } from "../../../../core/utils/validations";
import { GenderEnum } from "../../enums/gender.enum";
import { RoleModel } from "../../models/role.model";
import { UserModel } from "../../models/user.model";
import { RoleService } from "../../services/role.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public userForm: FormGroup;
  public formErrors: FormErrors;
  public roles: RoleModel[] = [];
  public genders: { key: number, name: string }[] = [
    { key: GenderEnum.Male, name: 'Hombre' },
    { key: GenderEnum.Female, name: 'Mujer' }
  ];

  constructor(private dialogRef: MatDialogRef<UserDetailComponent>,
              private formBuilder: FormBuilder,
              private roleService: RoleService,
              @Inject(MAT_DIALOG_DATA) public data?: UserModel) {
    this.userForm = this.formBuilder.group({
      completeName: [data?.completeName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: [data?.email || '', [Validators.required, Validators.email, Validators.maxLength(120)]],
      phone: [data?.phone || '', [
        Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(phoneRegex)
      ]],
      birthday: [data?.birthday || null, [Validators.required, dateBeforeNow]],
      gender: [data?.gender || null, [Validators.required]],
      roles: [data?.roles || null, [Validators.required]]
    });

    this.formErrors = new FormErrors(this.userForm);

    this.loadRoles();
  }

  private loadRoles(): void {
    this.roleService.findAll().subscribe(roles => this.roles = roles);
  }
}
