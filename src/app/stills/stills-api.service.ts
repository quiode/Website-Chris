import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Still } from './still.interface';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StillsApiService {
  constructor(private httpClient: HttpClient) {}
  private readonly stillsUrl = environment.apiUrl + 'stills/';
  private chachedImages: { [id: string]: HTMLImageElement } = {};

  /**
   * @returns all stills as metadata from the api
   */
  getStillsMetadata(): Observable<Still[]> {
    const stills = this.httpClient.get<Still[]>(this.stillsUrl).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
    return stills;
  }

  /**
   * get a still from the api
   * @param id id of the still
   * @returns a blob object which can be used to create an image
   */
  private getThumbnail(id: string) {
    return this.httpClient.get(`${this.stillsUrl}${id}/thumbnail/`, { responseType: 'blob' });
  }

  private blobToImage(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    const result = new Promise<HTMLImageElement>((resolve, reject) => {
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        resolve(img);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
    return result;
  }

  /**
   * @returns URL of the api
   */
  getApiUrl(): URL {
    return new URL(this.stillsUrl);
  }

  getImage(id: string) {
    if (this.chachedImages[id]) {
      return Promise.resolve(this.chachedImages[id]);
    }
    const result = new Promise<HTMLImageElement>((resolve, reject) => {
      this.getThumbnail(id).subscribe((blob) => {
        this.blobToImage(blob).then(
          (img) => {
            this.chachedImages[id] = img;
            resolve(img);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
    return result;
  }
}
