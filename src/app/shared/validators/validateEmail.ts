import {FormControl} from '@angular/forms';


export function validateEmail(ctrl: FormControl) {
  let pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  return pattern.test(ctrl.value) ? null : {
    validateEmail: {
      valid: false
    }
  }
}
