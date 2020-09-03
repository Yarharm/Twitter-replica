import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../models';
import { URL } from './urls';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}
  private currentUser = {};
  private currentUserListener = new Subject<UserModel>();

  getUser(usernamePrefix: string) {
    this.httpClient
      .get<UserModel>(`${URL.GET_USER}${usernamePrefix}`)
      .subscribe((user: UserModel) => {
        this.currentUser = user;
        this.currentUserListener.next(user);
      });
  }

  updateUser(
    id: string,
    name: string,
    bio: string,
    avatar: File | string,
    coverImage: File | string
  ) {
    const usernamePrefix = this.authService.getUsernamePrefix();
    let updatedUser: FormData | UserModel = null;
    if (typeof avatar === 'object' || typeof coverImage === 'object') {
      updatedUser = new FormData();
      updatedUser.append('id', id);
      updatedUser.append('name', name);
      updatedUser.append('bio', bio);
      updatedUser.append('avatar', avatar);
      updatedUser.append('coverImage', coverImage);
    } else {
      updatedUser = this.buildNewUser(id, name, bio, avatar, coverImage);
    }
    this.httpClient
      .put(`${URL.UPDATE_USER}${usernamePrefix}`, updatedUser)
      .subscribe(() => this.getUser(usernamePrefix));
  }

  getCurrentUserListener() {
    return this.currentUserListener.asObservable();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  private buildNewUser(
    id: string,
    name: string,
    bio: string,
    avatar: string,
    coverImage: string,
    username: string = null
  ): UserModel {
    return { id, name, bio, avatar, coverImage, username };
  }
}
