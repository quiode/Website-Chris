import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, finalize, Observable, map } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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
    this.music = this.musicSubject.pipe(
      map((music) => music.map((m, i) => ({ ...m, position: i })))
    );
    this.updateMusic();
  }
  private readonly backendUrl = environment.apiUrl + 'music';
  private musicSubject = new BehaviorSubject<Music[]>([]);
  music: Observable<Music[]>;

  updateMusic(): void {
    this.httpClient.get<Music[]>(this.backendUrl).subscribe((music) => {
      this.musicSubject.next(music.sort((a, b) => a.position - b.position));
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

  async getAudioUrl(id: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this.httpClient.get(this.backendUrl + '/' + id, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        },
        error: (err) => {
          console.log(err);
          reject(err);
        },
      });
    });
  }

  async getCoverUrl(id: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this.httpClient
        .get(this.backendUrl + '/' + id + '/image', { responseType: 'blob' })
        .subscribe({
          next: (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          },
          error: (err) => {
            console.log(err);
            reject(err);
          },
        });
    });
  }

  deleteMusic(id: string): void {
    this.httpClient.delete(this.backendUrl + '/' + id).subscribe(() => {
      this.updateMusic();
    });
  }

  moveItem(prevIndex: number, currentIndex: number) {
    const music = this.musicSubject.value;
    moveItemInArray(music, prevIndex, currentIndex);
    this.musicSubject.next(music);
  }

  updateUrl(id: string, url: string): void {
    const music = this.musicSubject.value;
    const musicItem = music.find((m) => m.id === id);
    if (musicItem) {
      musicItem.url = url;
      this.musicSubject.next(music);
    }
  }

  async submitChanges(): Promise<void> {
    let music = this.musicSubject.value;
    music = music.map((m, index) => ({ ...m, position: index }));
    return new Promise((reject, resolve) => {
      this.httpClient
        .patch<Music[]>(
          this.backendUrl,
          music.map((m) => ({ id: m.id, position: m.position, url: m.url }))
        )
        .subscribe({
          next: (data) => {
            resolve();
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
