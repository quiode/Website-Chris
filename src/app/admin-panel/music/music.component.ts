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
    audio: new FormControl(null, [Validators.required, fileTypeValidator(['mp3'])]),
    cover: new FormControl(null, [Validators.required, fileTypeValidator(['jpg', 'jpeg'])]),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]),
  });

  ngOnInit(): void {}
}
