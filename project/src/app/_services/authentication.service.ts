import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  private _token: string;

  private _isLoggedInEvent: BehaviorSubject<boolean>;
  private _isLoggedInObservable: Observable<boolean>;

  constructor(private http: Http) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.token = currentUser && currentUser.token;

    this._isLoggedInEvent = new BehaviorSubject<boolean>(!!currentUser);
    this._isLoggedInObservable = this._isLoggedInEvent.asObservable();
  }

  get token(): string {
    return this._token;
  }

  set token(t: string) {
    this._token = t;
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/v1/token-auth', JSON.stringify({ login: email, password: password }), this.header())
    .map((response: Response) => {
      console.log(response);
      // login successful if there's a jwt token in the response
      let user = response.json();
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._isLoggedInEvent.next(true);
        this._isLoggedInObservable = this._isLoggedInEvent.asObservable();
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._isLoggedInEvent.next(false);
    this._isLoggedInObservable = this._isLoggedInEvent.asObservable();
  }

  isLoggedInObservable(): Observable<boolean> {
    return this._isLoggedInObservable;
  }

  // private helper methods

  private header() {
    // create authorization header with jwt token {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    return new RequestOptions({ headers: headers });
  }
}
