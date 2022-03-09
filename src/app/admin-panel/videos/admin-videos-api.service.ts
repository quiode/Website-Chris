import { Injectable } from '@angular/core';
import { Video } from './videos.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminVideosApiService {
  constructor() {
    this.videos.subscribe((videos) => {
      this.videosSnapshot = videos;
    });
    this.getVideos().then((videos) => {
      this.videos.next(videos);
    });
  }

  private videosSnapshot: Video[] = [];
  videos = new Subject<Video[]>();

  getVideoSnapshot(): Video[] {
    return this.videosSnapshot;
  }

  getVideos(): Promise<Video[]> {
    // TODO
    return Promise.resolve(this.videosSnapshot);
  }
}
