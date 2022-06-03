import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Role } from "../../../../core/enums/role";
import { ErrorControl } from "../../../../core/models/error-control";
import { Select } from "../../../../core/models/select";
import { FormErrors } from "../../../../core/utils/form-errors";
import { phoneRegex, dateBeforeNow } from "../../../../core/utils/validations";
import { GenderEnum } from "../../enums/gender.enum";
import { TurnUserEnum } from "../../enums/turn-user.enum";
import { TypeAcademicEnum } from "../../enums/type-academic.enum";
import { TypeUserEnum } from "../../enums/type-user.enum";
import { RoleModel } from "../../models/role.model";
import { UserModel } from "../../models/user.model";
import { RoleService } from "../../services/role.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public userForm: FormGroup;
  public formErrors: FormErrors;
  public roles: RoleModel[] = [];
  public genders: Select[] = [
    { id: GenderEnum.Male.valueOf(), name: GenderEnum.MaleStr.toString() },
    { id: GenderEnum.Female.valueOf(), name: GenderEnum.FemaleStr.toString() }
  ];
  public typeUsers: Select[] = [
    { id: TypeUserEnum.Student.valueOf(), name: TypeUserEnum.StudentStr.toString() },
    { id: TypeUserEnum.Academic.valueOf(), name: TypeUserEnum.AcademicStr.toString() },
    { id: TypeUserEnum.External.valueOf(), name: TypeUserEnum.ExternalStr.toString() }
  ];
  public turnUser: Select[] = [
    { id: TurnUserEnum.Morning.valueOf(), name: TurnUserEnum.MorningStr.toString() },
    { id: TurnUserEnum.Afternoon.valueOf(), name: TurnUserEnum.AfternoonStr.toString() }
  ];
  public typeAcademic: Select[] = [
    { id: TypeAcademicEnum.Teacher.valueOf(), name: TypeAcademicEnum.TeacherStr.toString() },
    { id: TypeAcademicEnum.Administrative.valueOf(), name: TypeAcademicEnum.AdministrativeStr.toString() },
    { id: TypeAcademicEnum.GeneralStaff.valueOf(), name: TypeAcademicEnum.GeneralStaffStr.toString() }
  ];

  constructor(private dialogRef: MatDialogRef<UserDetailComponent>,
              private formBuilder: FormBuilder,
              private roleService: RoleService,
              private userService: UserService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data?: UserModel) {
    this.userForm = this.formBuilder.group({
      completeName: [data?.completeName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: [data?.email || '', [Validators.required, Validators.email, Validators.maxLength(120)]],
      phone: [data?.phone || '', [
        Validators.required, Validators.pattern(phoneRegex)
      ]],
      birthday: [data?.birthday || null, [Validators.required, dateBeforeNow]],
      gender: [data?.gender || null, [Validators.required]],
      roles: [data?.roles || null, [Validators.required, this.validateRole]],
      type: [data?.type || null, [Validators.required]],
      student: this.formBuilder.group({
        turn: [data?.student?.turn || null],
        group: [data?.student?.group || null]
      }),
      academic: this.formBuilder.group({
        registration: [data?.academic?.registration || null],
        typeAcademic: [data?.academic?.type || null]
      })
    });

    this.formErrors = new FormErrors(this.userForm);
    this.userForm.get('type')?.valueChanges.subscribe(type => {
      this.validateFieldsTypeUser(type);
    });

    this.loadRoles();
  }

  public save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: UserModel = this.userForm.value;
    if (!this.data) {
      // Se inserta el registro
      this.userService.store(user).subscribe(() => {
        this.toastr.success(`Usuario ${user.completeName} agregado.`, 'Proceso exitoso');
        this.close(true);
      });
    } else {
      // Se actualiza el registro
    }
  }

  private loadRoles(): void {
    this.roleService.findAll().subscribe(roles => this.roles = roles);
  }

  private validateRole(control: FormControl): ErrorControl | null {
    if (control.value || control.value?.length > 0) {
      const roles: number[] = control.value;

      if (roles.find(rol => rol === Role.Admin) && roles.find(rol => rol === Role.Capturist)) {
        return { invalidRoleCombination: true };
      }
    }

    return null;
  }

  private validateFieldsTypeUser(type: number): void {
    if (type === TypeUserEnum.Student.valueOf()) {
      this.userForm.get('student.turn')?.addValidators(Validators.required);
      this.userForm.get('student.group')?.addValidators([Validators.required, Validators.minLength(8),
        Validators.maxLength(15)]);

      this.userForm.get('academic.registration')?.clearValidators();
      this.userForm.get('academic.typeAcademic')?.clearValidators();
    } else if (type === TypeUserEnum.Academic.valueOf()) {
      this.userForm.get('academic.typeAcademic')?.addValidators(Validators.required);
      this.userForm.get('academic.registration')?.addValidators([Validators.required, Validators.minLength(10),
        Validators.maxLength(15)]);

      this.userForm.get('student.turn')?.clearValidators();
      this.userForm.get('student.group')?.clearValidators();
    } else if (type === TypeUserEnum.External.valueOf()) {
      this.userForm.get('student.turn')?.clearValidators();
      this.userForm.get('student.group')?.clearValidators();
      this.userForm.get('academic.registration')?.clearValidators();
      this.userForm.get('academic.typeAcademic')?.clearValidators();
    }
  }

  private close(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }
}
