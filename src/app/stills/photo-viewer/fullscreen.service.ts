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
  }

  /* Close fullscreen */
  closeFullscreen() {
    document.exitFullscreen();
  }
}
