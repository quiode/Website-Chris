import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../shared/validators/file-type-validator.directive';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class AdminMusicComponent implements OnInit {
  constructor() {}
  uploadForm = new FormGroup({
    audio: new FormControl('', [Validators.required, fileTypeValidator(['mp3'])]),
    cover: new FormControl('', [Validators.required, fileTypeValidator(['jpg', 'jpeg'])]),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]),
  });

  ngOnInit(): void {}

  applyClass(controlName: string): string {
    const control = this.uploadForm.get(controlName);
    if (control) {
      if (control.touched) {
        return control.invalid ? 'is-invalid' : 'is-valid';
      }
    }

    return '';
  }

  submit(): void {
    this.uploadForm.reset({
      audio: '',
      cover: '',
      url: '',
    });
  }
}
