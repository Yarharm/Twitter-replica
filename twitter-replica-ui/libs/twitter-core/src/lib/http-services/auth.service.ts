import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  BackendSignupModel,
  SignupModel,
  LoginModel,
  AuthToken,
} from 'libs/twitter-core/src';
import { URL } from 'libs/twitter-core/src/lib/http-services/urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  constructor(private readonly httpClient: HttpClient) {}

  createUser(email: string, username: string, password: string) {
    const userInfo: SignupModel = this.buildNewUser(email, username, password);

    this.httpClient
      .post<BackendSignupModel>(URL.AUTH_SIGNUP, userInfo)
      .subscribe();
  }

  loginUser(username: string, password: string) {
    const loginInfo: LoginModel = this.buildLoginData(username, password);

    this.httpClient
      .post<AuthToken>(URL.AUTH_LOGIN, loginInfo)
      .subscribe((authToken: AuthToken) => {
        this.token = authToken.token;
      });
  }

  getAuthorizationToken() {
    return this.token;
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
