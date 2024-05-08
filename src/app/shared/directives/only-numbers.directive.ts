import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  @Input() decimal: number = 0;

  constructor(
    private _el: ElementRef
  ) {
  }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    if (this.decimal !== 0) {
      return;
    }

    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.decimal === 0) {
      return;
    }

    const inputValue: string = event.key;
    const allowedKeys: string[] = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/[0-9.]/.test(inputValue) && !allowedKeys.includes(inputValue)) {
      event.preventDefault();
      return;
    }

    if (inputValue === '.' && this._el.nativeElement.value.includes('.')) {
      event.preventDefault();
      return;
    }

    if (this._el.nativeElement.value.includes('.')) {
      const decimalIndex = this._el.nativeElement.value.indexOf('.');
      const currentDecimalLength = this._el.nativeElement.value.substring(decimalIndex + 1).length;

      if (currentDecimalLength >= this.decimal && !allowedKeys.includes(inputValue)) {
        event.preventDefault();
      }
    }
  }
}
