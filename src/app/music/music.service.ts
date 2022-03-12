import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, finalize } from 'rxjs';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { join } from 'path-browserify';

export interface Music {
  id: string;
  hash: string;
  url: string;
  position: number;
  pictureId: string;
}

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private httpClient: HttpClient) {
    this.updateMusic();
  }
  private backendUrl = join(environment.apiUrl, 'music');
  music = new BehaviorSubject<Music[]>([]);

  updateMusic(): void {
    this.httpClient.get<Music[]>(this.backendUrl).subscribe((music) => {
      this.music.next(music);
    });
  }

  saveMusic(song: File, image: File, url: string): Subject<number> {
    const uploadProgress = new Subject<number>();
    const data = new FormData();
    data.append('song', song);
    data.append('cover', image);
    data.append('url', url);
    this.httpClient
      .post<Music>(this.backendUrl, data, { reportProgress: true, observe: 'events' })
      .pipe(
        finalize(() => {
          uploadProgress.complete();
          this.updateMusic();
        })
      )
      .subscribe({
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
    uploadProgress.next(0);
    return uploadProgress;
  }
}
