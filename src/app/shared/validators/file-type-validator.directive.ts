import { extname } from 'path-browserify';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function fileTypeValidator(fileEndings: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fileExtension = extname(control.value).replace('.', '');
    return !fileEndings.includes(fileExtension)
      ? { forbiddenFileType: { extension: fileExtension } }
      : null;
  };
}
