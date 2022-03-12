import { Component, OnInit } from '@angular/core';
import { AdminVideosApiService } from './admin-videos-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../shared/validators/file-type-validator.directive';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface Video {
  id: string;
  line1: string;
  line2: string;
  url: string;
  picture1Id: string;
  picture2Id: string;
  picture3Id: string;
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
          this.files = {};
          this.form.reset();
        },
      });
    } else {
      alert('Invalid form');
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.videosApi.insert(event.previousIndex, event.currentIndex);
    this.changes = true;
  }

  videoChanged(video: Video) {
    const videoIndex = this.videos.indexOf(video);
    if (video) {
      this.changes = true;
      this.videos[videoIndex] = video;
      this.videosApi.videos.next(this.videos);
    }
  }

  uploadChanges() {
    const videos = this.videosApi.videos.value;
    if (this.videosApi.checkElements(videos)) {
      this.videosApi.replaceVideoMetadata(videos).then(
        (result) => {
          this.changes = false;
          this.videosApi.updateVideos();
        },
        (error) => {
          alert('Error: ' + error);
          this.changes = false;
          this.videosApi.updateVideos();
        }
      );
    } else {
      alert('Form is not valid');
    }
  }

  onDelete(id: string) {
    this.videosApi.deleteVideo(id).then(
      (result) => {
        this.videosApi.updateVideos();
      },
      (error) => {
        alert('Error: ' + error);
      }
    );
  }
}
