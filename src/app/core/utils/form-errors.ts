import { FormGroup } from "@angular/forms";

export class FormErrors {
  public form: FormGroup;

  constructor(form: FormGroup) {
    this.form = form;
  }

  public customError(field: string, error: string): boolean | undefined {
    return this.form.get(field)?.hasError(error) && this.form.get(field)?.touched;
  }

  public email(field: string): boolean | undefined {
    return this.form.get(field)?.hasError('email') && this.form.get(field)?.touched;
  }

  public errorObject(field: string, error: string): any {
    return this.form.get(field)?.getError(error);
  }

  public maxLength(field: string): boolean | undefined {
    return this.form.get(field)?.hasError('maxlength') && this.form.get(field)?.touched;
  }

  public maxLengthNumber(field: string): number {
    return this.errorObject(field, 'maxlength').requiredLength;
  }

  public minLength(field: string): boolean | undefined {
    return this.form.get(field)?.hasError('minlength') && this.form.get(field)?.touched;
  }

  public minLengthNumber(field: string): number {
    return this.errorObject(field, 'minlength').requiredLength;
  }

  public required(field: string): boolean | undefined {
    return this.form.get(field)?.hasError('required') && this.form.get(field)?.touched;
  }
}
