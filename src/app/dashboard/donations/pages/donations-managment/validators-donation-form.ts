import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';
import { UserService } from '@shared/services/user.service';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

export const uniqueUserValidator = (usersArray: () => FormArray): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const userId = control.value;

    if (!userId) {
      return null;
    }

    const usersId: number[] = usersArray().controls
      .filter(ctrl => ctrl.get('id') !== control)
      .map(ctrl => ctrl.get('id')?.value);

    if (usersId.some(id => id === userId)) {
      control.setValue(null);
      return { duplicateUser: true };
    }

    return null;
  }
}

export const uniqueEmailInFormValidator = (usersArray: () => FormArray): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;

    if (!email) {
      return null;
    }

    const emails: string[] = usersArray().controls
      .filter(ctrl => ctrl.get('correo') !== control)
      .map(ctrl => ctrl.get('correo')?.value);

    if (emails.some(row => row === email)) {
      control.setValue(null);
      return { duplicateEmail: true };
    }

    return null;
  }
}

export const uniquePhoneInFormValidator = (usersArray: () => FormArray): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;

    if (!phone) {
      return null;
    }

    const phones: string[] = usersArray().controls
      .filter(ctrl => ctrl.get('telefono') !== control)
      .map(ctrl => ctrl.get('telefono')?.value);

    if (phones.some(row => row === phone)) {
      control.setValue(null);
      return { duplicatePhone: true };
    }

    return null;
  }
}

export const generateValidatorsTypeUser = (form: FormGroup, tipoId: any, fb: FormBuilder): void => {
  form.removeControl('escolar');
  form.removeControl('alumno');

  if (tipoId === TypeUserEnum.ESCOLAR) {
    form.addControl('escolar', fb.group({
      matricula: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ],
      tipoId: [null, Validators.required]
    }));

    form.updateValueAndValidity();

    return;
  }

  if (tipoId === TypeUserEnum.ALUMNO) {
    form.addControl('alumno', fb.group({
      semestre: [null, Validators.required],
      carreraId: [null, Validators.required],
      turnoId: [null, Validators.required],
    }))

    form.updateValueAndValidity();

    return;
  }

  form.updateValueAndValidity();
}

export const emailExistValidator = (userService: UserService, cd: ChangeDetectorRef): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.validateField('correo', control.value).pipe(
      map(({ exists }) => {
        cd.markForCheck();
        return (exists) ? { emailExist: true } : null;
      }),
      catchError(() => {
        cd.markForCheck();
        return of(null);
      })
    );
  }
}

export const phoneExistValidator = (userService: UserService, cd: ChangeDetectorRef): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.validateField('telefono', control.value).pipe(
      map(({ exists }) => {
        cd.markForCheck();
        return (exists) ? { phoneExist: true } : null;
      }),
      catchError(() => {
        cd.markForCheck();
        return of(null);
      })
    );
  }
}
