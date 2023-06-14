import { Injectable } from '@angular/core';
import { Video } from './videos.component';
import { Subject, finalize, map, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { UUID } from 'crypto';
import { ProgressService } from '../shared/progress.service';

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
  constructor(private httpClient: HttpClient, private progressService: ProgressService) {
    this.getVideos().subscribe((videos) => {
      this.videos.next(videos);
    });

    this.videos.pipe(map((videos) => videos.sort((a, b) => a.position - b.position)));
  }
  backendUrl = environment.apiUrl + 'videos/';

  videos = new BehaviorSubject<Video[]>([]);

  getVideoSnapshot(): Video[] {
    return this.videos.value;
  }

  getVideos() {
    return this.httpClient.get<Video[]>(this.backendUrl);
  }

  addVideo(data: FormData) {
    let uploadProgress = new Subject<{ progress: number, type: string }>();
    const upload = this.httpClient
      .post<{ uuid: UUID }>(this.backendUrl, data, {
        reportProgress: true,
        observe: 'events',
      });

    uploadProgress.next(
      { progress: 0, type: 'Uploading' }
    );

    upload.subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            uploadProgress.next(
              { progress: Math.round(100 * (event.loaded / event.total)), type: 'Uploading' }
            );
          }
        } else if (event.type === HttpEventType.Response) {
          if (event.body?.uuid) {
            this.progressService.getProgress(event.body.uuid).subscribe({
              next: progress => uploadProgress.next(progress),
              error: err => {
                uploadProgress.error(err);
                uploadProgress.complete();
              },
              complete: () => uploadProgress.complete()
            });
          } else {
            uploadProgress.error("No uuid received!");
            uploadProgress.complete();
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

  async getImageUrl(image: string, id: string) {
    return await new Promise<string>((resolve, reject) => {
      this.httpClient.get(this.backendUrl + id + '/' + image, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * removes a video from the old position and moves it to the new position
   * @param prevPosition old position of the video
   * @param newPosition new position of the video
   */
  insert(prevPosition: number, newPosition: number) {
    if (prevPosition == newPosition) {
      return;
    }
    const videos = this.videos.value;
    moveItemInArray(videos, prevPosition, newPosition);
    videos.map((video, index) => {
      video.position = index;
    });
    this.videos.next(videos);
  }

  /**
   * position has to be unique, line1 and line2 not empty and the url has to be a valid url
   * @param videos return true if all elements are valid
   */
  checkElements(videos: Video[]) {
    console.log(videos);
    return videos.every((video, index) => {
      return (
        video.position != null &&
        video.position != undefined &&
        video.position >= 0 &&
        video.position < videos.length &&
        video.position == index &&
        video.line1 != null &&
        video.line1 != undefined &&
        video.line1 != '' &&
        video.line2 != null &&
        video.line2 != undefined &&
        video.line2 != '' &&
        video.url != null &&
        video.url != undefined &&
        video.url != '' &&
        RegExp(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        ).test(video.url)
      );
    });
  }

  replaceVideoMetadata(video: Video[]) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .patch(
          this.backendUrl,
          video.map((video) => {
            return {
              id: video.id,
              position: video.position,
              line1: video.line1,
              line2: video.line2,
              url: video.url,
            };
          })
        )
        .subscribe({
          next: (data) => {
            resolve(true);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  async deleteVideo(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.delete(this.backendUrl + id).subscribe({
        next: (data) => {
          resolve();
        },
        error: (err) => {
          console.log(err);
          reject(err);
        },
      });
    });
  }

  updateVideos() {
    this.getVideos().subscribe((videos) => {
      this.videos.next(videos);
    });
  }
}
