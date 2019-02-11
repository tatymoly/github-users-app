import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        })
      );
  }
  searchUserDetails(user: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.url + '/users/' + user);
  }
}
