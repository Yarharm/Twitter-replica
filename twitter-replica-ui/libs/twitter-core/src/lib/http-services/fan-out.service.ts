import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { URL } from './urls';
import { FollowModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FanOutService {
  constructor(private readonly httpClient: HttpClient) {}

  // Subjects
  private followingUsersListener = new Subject<FollowModel[]>();
  private followersListener = new Subject<FollowModel[]>();

  getFollowingUsers() {
    this.httpClient
      .get<FollowModel[]>(`${URL.FOLLOWING_USERS}`)
      .subscribe((usersToFollow: FollowModel[]) => {
        this.followingUsersListener.next(usersToFollow);
      });
  }

  getFollowers() {
    this.httpClient
      .get<FollowModel[]>(`${URL.FOLLOWER_USERS}`)
      .subscribe((followers: FollowModel[]) => {
        this.followersListener.next(followers);
      });
  }

  followUser(usernamePrefixToFollow: string) {
    this.httpClient
      .post(`${URL.FOLLOW_USER}`, {
        usernamePrefix: usernamePrefixToFollow,
      })
      .subscribe(() => {});
  }

  unfollowUser(usernamePrefixToFollow: string) {
    this.httpClient
      .post(`${URL.UNFOLLOW_USER}`, {
        usernamePrefix: usernamePrefixToFollow,
      })
      .subscribe(() => {});
  }

  getFollowingUsersListener() {
    return this.followingUsersListener.asObservable();
  }

  getFollowersListener() {
    return this.followersListener.asObservable();
  }
}
