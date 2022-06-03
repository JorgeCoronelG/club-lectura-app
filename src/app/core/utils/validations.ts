import { FormControl } from "@angular/forms";
import * as moment from "moment/moment";
import { ErrorControl } from "../models/error-control";

export const phoneRegex = /^\d{10}$/;

export const dateBeforeNow = (control: FormControl): ErrorControl | null => {
  if (control.value) {
    const today = moment();
    const currentValue = moment(control.value);

    if (currentValue.isAfter(today)) {
      return { invalidDate: true };
    }
  }

  return null;
};
