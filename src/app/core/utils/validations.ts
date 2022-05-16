import { FormControl } from "@angular/forms";

export const phoneRegex = '/^[0-9]{10}$/';

export const dateBeforeNow = (control: FormControl): { [s: string]: boolean } | null => {
  if (control.value) {
    const today = new Date().getTime();

    if (control.value.getTime() >= today) {
      return {
        invalidDate: true
      };
    }
  }

  return null;
};
