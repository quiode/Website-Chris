import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, Subscriber } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let token = localStorage.getItem('token') || '';
    if (!jwtHelper.isTokenExpired(token)) {
      this.loggedIn.next(true);
      this.token = token;
    } else {
      localStorage.removeItem('token');
    }
  }
  private backendUrl = environment.apiUrl + 'auth/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token = '';
  private timeout: NodeJS.Timeout | null = null;

  /**
   * @param username username of the user
   * @param password password of the user
   * @returns resolves to true if the login was successful, else rejects
   */
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<{ access_token: string }>(this.backendUrl + 'login', {
          username: username,
          password: password,
        })
        .pipe(
          catchError((error) => {
            reject(error);
            return '';
          })
        )
        .subscribe((token) => {
          if (typeof token == 'string') {
            reject('Invalid username or password');
          } else {
            const expirationDate = this.jwtHelper.getTokenExpirationDate(token.access_token);
            if (expirationDate == null) {
              reject('Invalid username or password');
            } else {
              const now = new Date();
              if (expirationDate < now) {
                this.logout();
                reject('Token expired');
              } else {
                this.loggedIn.next(true);
                this.token = token.access_token;
                localStorage.setItem('token', token.access_token);
                this.timeout = setTimeout(() => {
                  this.logout();
                  if (this.route.snapshot.url.toString().includes('admin')) {
                    this.router.navigate(['/admin/login']);
                  }
                }, expirationDate.getTime() - now.getTime() - 1 * 60 * 1000);
                resolve(true);
              }
            }
            resolve(true);
          }
        });
    });
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    if (this.timeout != null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  getIsLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return this.token;
  }
}
