import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {
  BackendSignupModel,
  SignupModel,
  LoginModel,
  BackendLogin,
} from 'libs/twitter-core/src';
import { URL } from './urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: string;
  private token = '';
  private authStatus = false;
  private authTokenListener = new Subject<boolean>();

  constructor(
    private readonly httpClient: HttpClient,
    private router: Router
  ) {}

  createUser(email: string, username: string, password: string) {
    const userInfo: SignupModel = this.buildNewUser(email, username, password);

    this.httpClient
      .post<BackendSignupModel>(URL.AUTH_SIGNUP, userInfo)
      .subscribe(() => this.router.navigate([URL.HOME_PAGE]));
  }

  loginUser(username: string, password: string) {
    const loginInfo: LoginModel = this.buildLoginData(username, password);

    this.httpClient
      .post<BackendLogin>(URL.AUTH_LOGIN, loginInfo)
      .subscribe((loginRes: BackendLogin) => {
        this.token = loginRes.token;
        this.userId = loginRes.userId;
        this.authStatus = true;
        this.authTokenListener.next(this.authStatus);
        this.saveAuthInfo();
        this.router.navigate([URL.HOME_PAGE]);
      });
  }

  getUserId() {
    return this.userId;
  }

  getAuthTokenListener() {
    return this.authTokenListener.asObservable();
  }

  getAuthorizationToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus;
  }

  logout() {
    this.userId = null;
    this.token = '';
    this.authStatus = false;
    this.authTokenListener.next(this.authStatus);
    this.clearAuthInfo();
    this.router.navigate([URL.HOME_PAGE]);
  }

  fetchAuthFromStorage() {
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      return;
    }
    this.userId = localStorage.getItem('userId');
    this.authStatus = true;
    this.authTokenListener.next(this.authStatus);
  }

  private saveAuthInfo() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
  }

  private clearAuthInfo() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private buildLoginData(username: string, password: string): LoginModel {
    return { username, password };
  }

  private buildNewUser(
    email: string,
    username: string,
    password: string
  ): SignupModel {
    return { email, username, password };
  }
}
