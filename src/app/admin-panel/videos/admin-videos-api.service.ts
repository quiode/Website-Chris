import { Injectable } from '@angular/core';
import { Video } from './videos.component';
import { Subject, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';

export interface PostVideo {
  video: File;
  image1: File;
  image2: File;
  image3: File;
  title: string;
  subtitle: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminVideosApiService {
  constructor(private httpClient: HttpClient) {
    this.videos.subscribe((videos) => {
      this.videosSnapshot = videos;
    });
    this.getVideos().subscribe((videos) => {
      this.videos.next(videos);
    });
  }
  backendUrl = environment.apiUrl + 'videos/';

  private videosSnapshot: Video[] = [];
  videos = new Subject<Video[]>();

  getVideoSnapshot(): Video[] {
    return this.videosSnapshot;
  }

  getVideos() {
    return this.httpClient.get<Video[]>(this.backendUrl);
  }

  addVideo(data: FormData) {
    let uploadProgress = new Subject<number>();
    const upload = this.httpClient
      .post(this.backendUrl, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        finalize(() => {
          uploadProgress.complete();
        })
      );
    uploadProgress.next(0);
    upload.subscribe({
      next: (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          if (event.total) {
            uploadProgress.next(Math.round(100 * (event.loaded / event.total)));
          }
        }
      },
      error: (err) => {
        console.log(err);
        alert('Upload failed: ' + err.error.message);
        uploadProgress.error(err);
        uploadProgress.complete();
      },
    });

    return uploadProgress;
  }
}
