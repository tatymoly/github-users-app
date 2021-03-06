import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { User, UserDetails } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  myParams;
  private url = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUsers(user: string, page: number): Observable<User> {
    return this.http
      .get<User>(this.url + '/search/users?q=' + user + '&page=' + page)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        }),
        retry(1),
        catchError(this.handleError)
      );
  }
  searchUserDetails(user: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.url + '/users/' + user).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
