import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { TypeUserEnum } from '@shared/enums/catalogo-opciones/type-user.enum';

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
