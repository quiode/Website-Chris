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

  getStills(): Observable<Still[]> {
    const stills = this.httpClient.get<Still[]>(this.stillsUrl).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
    return stills;
  }
}
