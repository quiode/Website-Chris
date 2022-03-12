import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
}
