import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoViewerService {
  constructor() {}

  nextImageUrl(currentId: string): string {}

  prevImageUrl(currentId: string): string {}
}
