import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

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
