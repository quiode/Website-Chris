import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  constructor() {}

  elem = document.documentElement;

  /* View in fullscreen */
  openFullscreen() {
    this.elem.requestFullscreen({ navigationUI: 'hide' });
    screen.orientation.lock('landscape-primary');
  }

  /* Close fullscreen */
  closeFullscreen() {
    document.exitFullscreen();
    screen.orientation.unlock();
  }
}
