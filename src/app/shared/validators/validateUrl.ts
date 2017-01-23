import { FormControl } from '@angular/forms';

export function validateUrl(ctrl:FormControl) {
  const urlValue = ctrl.value;
  // regular expression to test if url is valid or not.
  const valid: Boolean = /^(ftp|http|https):\/\/[^ "]+$/.test(urlValue);
  // validator function needs to return an object. 
  // and it is either null or not? weird.
  return valid ? null: {
    validUrl: {
      valid: false
    }
  }
}