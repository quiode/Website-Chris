import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Still } from './still.interface';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
export interface cachedImage {
  metaData: Still;
  thumbnail: HTMLImageElement;
  image: HTMLImageElement | null;
}

@Injectable({
  providedIn: 'root',
})
export class StillsApiService {
  constructor(private httpClient: HttpClient) {}
  private readonly stillsUrl = environment.apiUrl + 'stills/';
  private chachedImages: cachedImage[] = [];

  /**
   * @returns all stills as metadata from the api
   */
  getStillsMetadata(): Observable<Still[]> {
    const stills = this.httpClient
      .get<Still[]>(this.stillsUrl)
      .pipe(
        catchError((error) => {
          console.log(error);
          return [];
        })
      )
      .pipe(
        map((stills) => {
          for (const still of stills) {
            this.updateStillCache(still);
          }
          return stills;
        })
      );
    return stills;
  }

  /**
   * gets the thumbnail of a still from the api
   * @param id id of the still
   * @returns a blob object which can be used to create an image
   */
  private getThumbnail(id: string) {
    return this.httpClient.get(`${this.stillsUrl}${id}/thumbnail/`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  /**
   * get a still from the api
   * @param id id of the still
   * @returns a blob object which can be used to create an image
   */
  private getOriginal(id: string) {
    return this.httpClient.get(`${this.stillsUrl}${id}/`, {
      responseType: 'blob',
    });
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

  getThumbnailImage(id: string): Promise<HTMLImageElement> {
    const cached = this.getCachedImage(id);
    if (cached && cached.thumbnail) {
      return Promise.resolve(cached.thumbnail);
    }
    let headers: HttpHeaders;
    const result = new Promise<HTMLImageElement>((resolve, reject) => {
      this.getThumbnail(id).subscribe((response) => {
        headers = response.headers;
        if (response.body && response.headers) {
          this.blobToImage(response.body).then(
            (img) => {
              const cached = this.getCachedImage(id);
              if (cached) {
                const newCached = {
                  ...cached,
                  thumbnail: img,
                  metaData: {
                    ...cached.metaData,
                    id,
                    hash: headers.get('hash') || '',
                    position: parseInt(headers.get('position') || ''),
                  },
                };
                this.setCachedImage(id, newCached);
              } else {
                this.setCachedImage(id, {
                  thumbnail: img,
                  metaData: {
                    id,
                    hash: headers.get('hash') || '',
                    position: parseInt(headers.get('position') || ''),
                  },
                  image: null,
                });
              }
              resolve(img);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject('no image or headers');
        }
      });
    });
    return result;
  }

  getImage(id: string): Promise<HTMLImageElement> {
    const cached = this.getCachedImage(id);
    if (cached) {
      if (cached.image) {
        return Promise.resolve(cached.image as HTMLImageElement);
      } else {
        return new Promise((resolve, reject) => {
          this.getOriginal(id).subscribe((blob) => {
            this.blobToImage(blob).then(
              (img) => {
                this.setCachedImage(id, { ...cached, image: img });
                resolve(img);
              },
              (error) => {
                reject(error);
              }
            );
          });
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        this.getThumbnailImage(id)
          .then((thumbnail) => {
            this.getOriginal(id).subscribe((blob) => {
              this.blobToImage(blob)
                .then((img) => {
                  const cached = this.getCachedImage(id);
                  if (cached === null) {
                    console.error(cached, id, this.chachedImages);
                    throw Error('cached image not found');
                  }
                  this.setCachedImage(id, { ...cached, image: img });
                  resolve(img);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }

  private updateStillCache(still: Still) {
    const cached = this.getCachedImage(still.id);
    if (cached) {
      this.setCachedImage(still.id, { ...cached, metaData: still });
    }
  }

  getPosition(id: string) {
    const cached = this.getCachedImage(id);
    if (cached) {
      if (cached.metaData) {
        return cached.metaData.position;
      }
    }
    return null;
  }

  getPositionImage(image: string) {
    const cachedImage = this.chachedImages.find((cached) => cached.image?.src === image);
    if (cachedImage) {
      return cachedImage.metaData.position;
    }
    return null;
  }

  getImageUrl(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getImage(id)
        .then((img) => {
          resolve(img.src);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getLocation(id: string) {
    const image = this.chachedImages.find((cachedImage) => cachedImage.metaData.id === id);
    if (image) {
      return this.chachedImages.indexOf(image);
    }
    return null;
  }

  private getCachedImage(id: string) {
    const location = this.getLocation(id);
    if (location != null) {
      return this.chachedImages[location];
    } else {
      return null;
    }
  }

  private setCachedImage(id: string, cached: cachedImage) {
    const location = this.getLocation(id);
    if (location != null) {
      this.chachedImages[location] = cached;
    } else {
      this.chachedImages.push(cached);
    }
  }
}
