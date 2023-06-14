import { Injectable } from '@angular/core';
import { UUID } from 'crypto';
import { SseClient } from 'ngx-sse-client';
import { Observable, map, takeWhile, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private sseClient: SseClient) { }
  backendUrl = environment.apiUrl + 'progress/';

  getProgress(uuid: UUID): Observable<{ progress: number, type: string }> {
    return this.sseClient.stream(`${this.backendUrl}${uuid}`)
      .pipe(
        // tap(event => console.debug(event)),
        takeWhile(event => !event.type.includes("close")),
        map(event => {
          if (event.type === 'error') {
            console.debug(event);
              throw new Error("Error while processing data!");
          } else {
            return event;
          }
        }),
        map(event => {
          const typedEvent = event as MessageEvent<string>;
          const data = JSON.parse(typedEvent.data) as {progress: number, type: string};

          return {
            progress: data.progress,
            type: data.type
          };
        })
      );
  }
}
