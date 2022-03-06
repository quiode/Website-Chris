import { Injectable } from '@angular/core';
import { Still } from '../../stills/still.interface';
import { StillItem } from './still-item/still-item.component';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminStillsApiService {
  constructor(private httpClient: HttpClient) {}
  private backendUrl = environment.apiUrl + 'stills/';

  /**
   * @returns a promise which resolves the list of stills or rejects with an error
   */
  getStills(): Promise<StillItem[]> {
    const url = this.backendUrl;
    return new Promise((resolve, reject) => {
      this.httpClient.get<Still[]>(url).subscribe({
        next: (stills) => {
          const sortedStills = stills.sort((a, b) => a.position - b.position);
          const stillItems: StillItem[] = sortedStills.map((still) => {
            return {
              id: still.id,
            };
          });
          resolve(stillItems);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * @param id the id of the thumbnail to fetch
   * @returns the thumbnail as url string
   */
  getThumbnail(id: string): Promise<string> {
    const url = this.backendUrl + id + '/thumbnail';
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, { responseType: 'blob' }).subscribe({
        next: (image) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  deleteStill(id: string): Promise<void> {
    const url = this.backendUrl + id;
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, { responseType: 'text' }).subscribe({
        next: (response) => {
          resolve();
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  uploadStills(files: FileList) {
    let uploadProgress: {
      finished: boolean;
      progress: number;
    }[] = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const formData = new FormData();
      formData.append('file', element);
      const upload = this.httpClient
        .post(this.backendUrl, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          finalize(() => {
            uploadProgress[index] = {
              finished: true,
              progress: 100,
            };
          })
        );
      uploadProgress.push({ finished: false, progress: 0 });
      upload.subscribe({
        next: (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total) {
              uploadProgress[index].progress = Math.round(100 * (event.loaded / event.total));
            }
          }
        },
        error: (err) => {
          console.log(err);
          alert('Upload failed: ' + err.error.message);
        },
      });
    }
    return uploadProgress;
  }

  getAverageUploadProgress(
    uploadProgress: {
      finished: boolean;
      progress: number;
    }[]
  ): number {
    let progress = 0;
    let finished = 0;
    for (const upload of uploadProgress) {
      if (upload.finished) {
        finished++;
      }
      progress += upload.progress;
    }
    return progress / (uploadProgress.length - finished);
  }

  async replaceAllPositions(stills: StillItem[]) {
    const url = this.backendUrl + 'replace';
    const correctStills = stills.map((still, index) => {
      return {
        id: still.id,
        position: index,
      };
    });
    return new Promise<Still[]>((resolve, reject) => {
      this.httpClient.patch<Still[]>(url, correctStills).subscribe({
        next: (stills) => {
          resolve(stills);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
