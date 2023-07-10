import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatchDirective,
    multi: true
  }]
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') passwordControlName!: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    const confirmPassword = control.root.get(this.passwordControlName)?.value;

    if (password !== confirmPassword) {
      return { 'passwordMatch': true };
    }

    return null;
  }
}
