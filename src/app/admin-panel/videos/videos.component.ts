import { Component, OnInit } from '@angular/core';
import { AdminVideosApiService } from './admin-videos-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../shared/validators/file-type-validator.directive';

export interface Video {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image1: string;
  image2: string;
  image3: string;
  position: number;
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class AdminVideosComponent implements OnInit {
  constructor(private videosApi: AdminVideosApiService) {}
  videos: Video[] = [];
  files: { [index: string]: File } = {};
  changes = false;
  uploadProgress: number | null = null;
  form = new FormGroup({
    video: new FormControl('', [Validators.required, fileTypeValidator(['mp4'])]),
    image1: new FormControl('', [Validators.required, fileTypeValidator(['jpeg', 'jpg'])]),
    image2: new FormControl('', [Validators.required, fileTypeValidator(['jpeg', 'jpg'])]),
    image3: new FormControl('', [Validators.required, fileTypeValidator(['jpeg', 'jpg'])]),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]),
  });

  ngOnInit(): void {
    this.videosApi.videos.subscribe((videos) => {
      this.videos = videos;
    });
  }

  onFileSelect(event: any, formName: string) {
    if (event.target.files.length > 0) {
      this.files[formName] = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data = new FormData();
      data.append('video', this.files['video']);
      data.append('picture1', this.files['image1']);
      data.append('picture2', this.files['image2']);
      data.append('picture3', this.files['image3']);
      data.append(
        'metadata',
        JSON.stringify({
          url: this.form.get('url')?.value,
          line1: this.form.get('title')?.value,
          line2: this.form.get('subtitle')?.value,
        })
      );

      this.videosApi.addVideo(data).subscribe({
        next: (progress) => {
          this.uploadProgress = progress;
        },
        error: (err) => {
          alert('Error: ' + err);
        },
        complete: () => {
          this.uploadProgress = null;
          this.form.reset();
        },
      });
    } else {
      alert('Invalid form');
    }
  }
}
