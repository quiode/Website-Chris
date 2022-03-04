import { Injectable } from '@angular/core';
import { Still } from '../still.interface';
import { StillsApiService } from '../stills-api.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoViewerService {
  constructor(private stillsApiService: StillsApiService) {}

  async nextImageUrl(currentImage: string): Promise<string> {
    const position = this.stillsApiService.getPositionImage(currentImage);
    const allStillsPromise = new Promise<Still[]>((resolve) =>
      this.stillsApiService.getStillsMetadata().subscribe((stills) => {
        resolve(stills);
      })
    );
    const allStills = await allStillsPromise;
    if (position === null) {
      throw new Error('Position is null');
    }
    let newStill: string | undefined;
    if (position === allStills.length - 1) {
      newStill = allStills.find((still) => still.position === 0)?.id;
    } else {
      newStill = allStills.find((still) => still.position === position + 1)?.id;
    }
    if (newStill === undefined) {
      throw new Error('New still is undefined');
    }
    return this.stillsApiService.getImageUrl(newStill);
  }

  async prevImageUrl(currentImage: string): Promise<string> {
    const position = this.stillsApiService.getPositionImage(currentImage);
    const allStillsPromise = new Promise<Still[]>((resolve) =>
      this.stillsApiService.getStillsMetadata().subscribe((stills) => {
        resolve(stills);
      })
    );
    const allStills = await allStillsPromise;
    if (position === null) {
      throw new Error('Position is null');
    }
    let newStill: string | undefined;
    if (position === 0) {
      newStill = allStills.find((still) => still.position === allStills.length - 1)?.id;
    } else {
      newStill = allStills.find((still) => still.position === position - 1)?.id;
    }
    if (newStill === undefined) {
      throw new Error('New still is undefined');
    }
    return this.stillsApiService.getImageUrl(newStill);
  }
}
