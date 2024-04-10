import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const comparePassword = (password: string, confirmPassword: string) => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pass1 = formGroup.get(password)?.value;
    const pass2 = formGroup.get(confirmPassword)?.value;

    if (pass1 !== pass2) {
      let error = { differentPassword: true };
      formGroup.get(confirmPassword)?.setErrors(error);
      return error;
    }
    removeError(formGroup.get(confirmPassword)!, 'differentPassword');
    return null;
  }
}

export const sizeFile = (sizeMb: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const file: File = control.value;

      if (file.size > (sizeMb * 1000)) {
        return { sizeFile: true };
      }
    }

    return null;
  }
}

const removeError = (control: AbstractControl, error: string): void => {
  const err = control.errors;
  if (err) {
    delete err[error];
    if (!Object.keys(err).length) {
      control.setErrors(null);
    } else {
      control.setErrors(err);
    }
  }
}

