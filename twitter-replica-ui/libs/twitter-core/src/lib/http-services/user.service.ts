import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../models';
import { URL } from './urls';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: UserModel = {
    coverImage:
      'http://localhost:3333/Users/i521368/myProjects/Twitter-replica/twitter-replica-backend/media/unknown_background.jpg',
    avatar:
      'http://localhost:3333/Users/i521368/myProjects/Twitter-replica/twitter-replica-backend/media/unknown_user.png',
    name: 'Default User',
    username: '@DefaultUser',
    bio: '',
  };
  private currentUserListener = new Subject<UserModel>();

  constructor(private readonly httpClient: HttpClient) {}

  getUser(usernamePrefix: string) {
    return this.httpClient
      .get<UserModel>(`${URL.GET_USER}/${usernamePrefix}`)
      .subscribe((user: UserModel) => {
        this.currentUser = user;
        this.currentUserListener.next(this.currentUser);
      });
  }

  getCurrentUser() {
    return this.currentUser;
  }
  getCurrentUserListener() {
    return this.currentUserListener.asObservable();
  }
}
