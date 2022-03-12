import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../shared/validators/file-type-validator.directive';
import { MusicService } from '../../music/music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class AdminMusicComponent implements OnInit {
  constructor(private musicService: MusicService) {}
  files: { [index: string]: File } = {};
  uploadProgress: number | null = null;
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

  onFileSelect(event: any, formName: string) {
    if (event.target.files.length > 0) {
      this.files[formName] = event.target.files[0];
    }
  }

  submit(): void {
    if (this.uploadForm.valid) {
      if (this.files['audio'] && this.files['cover'] && this.uploadForm.get('url')) {
        this.musicService
          .saveMusic(this.files['audio'], this.files['cover'], this.uploadForm.get('url')!.value)
          .subscribe({
            next: (progress) => {
              this.uploadProgress = progress;
            },
            complete: () => {
              this.uploadProgress = null;
              this.files = {};
              this.uploadForm.reset({
                audio: '',
                cover: '',
                url: '',
              });
            },
            error: (err) => {
              this.uploadProgress = null;
              this.files = {};
              this.uploadForm.reset({
                audio: '',
                cover: '',
                url: '',
              });
            },
          });
      }
    }
  }
}
