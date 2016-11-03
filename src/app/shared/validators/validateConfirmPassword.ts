import {FormControl} from '@angular/forms';


export function validateConfirmPassword(password ,ctrl: FormControl) {

  const valid = password.value &&  ctrl.value && password.value === ctrl.value;

  return valid ? null : {
    validateConfirmPassword: {
      valid: false
    }
  }
}
