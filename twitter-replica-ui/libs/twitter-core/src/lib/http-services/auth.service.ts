import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {
  SignupResponseModel,
  SignupModel,
  LoginModel,
  LoginResponseModel,
} from '../models';
import { URL } from './urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: string;
  private token = '';
  private authStatus = false;
  private usernamePrefix: string;
  private authTokenListener = new Subject<boolean>();
  private usernamePrefixListener = new Subject<string>();

  constructor(
    private readonly httpClient: HttpClient,
    private router: Router
  ) {}

  createUser(email: string, username: string, password: string) {
    const userInfo: SignupModel = this.buildNewUser(email, username, password);

    this.httpClient
      .post<SignupResponseModel>(URL.AUTH_SIGNUP, userInfo)
      .subscribe(
        () => this.loginUser(username, password),
        () => {
          this.authStatus = false;
          this.authTokenListener.next(this.authStatus);
        }
      );
  }

  loginUser(username: string, password: string) {
    const loginInfo: LoginModel = this.buildLoginData(username, password);

    this.httpClient
      .post<LoginResponseModel>(URL.AUTH_LOGIN, loginInfo)
      .subscribe((loginRes: LoginResponseModel) => {
        this.token = loginRes.token;
        this.userId = loginRes.userId;
        this.usernamePrefix = loginRes.usernamePrefix;
        this.authStatus = true;
        this.authTokenListener.next(this.authStatus);
        this.saveAuthInfo();
        this.usernamePrefixListener.next(this.usernamePrefix);
        this.router.navigate([`user/${this.usernamePrefix}`]);
      });
  }

  getUserId() {
    return this.userId;
  }

  getAuthTokenListener() {
    return this.authTokenListener.asObservable();
  }

  getUsernamePrefixListener() {
    return this.usernamePrefixListener.asObservable();
  }

  getUsernamePrefix() {
    return this.usernamePrefix;
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
    this.usernamePrefix = '';
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
    this.usernamePrefix = localStorage.getItem('usernamePrefix');
    this.authStatus = true;
    this.authTokenListener.next(this.authStatus);
  }

  private saveAuthInfo() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('usernamePrefix', this.usernamePrefix);
  }

  private clearAuthInfo() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usernamePrefix');
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
