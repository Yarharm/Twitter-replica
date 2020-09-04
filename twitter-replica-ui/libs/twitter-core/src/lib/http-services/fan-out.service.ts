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
  followingUsers: FollowModel[] = [];
  followers: FollowModel[] = [];
  cachedFollowingUsers = false;
  cachedFollowers = false;

  // Subjects
  private followingUsersListener = new Subject<FollowModel[]>();
  private followersListener = new Subject<FollowModel[]>();

  getFollowingUsers() {
    if (this.cachedFollowingUsers) {
      this.followingUsersListener.next(this.followingUsers);
    } else {
      this.httpClient
        .get<FollowModel[]>(`${URL.FOLLOWING_USERS}`)
        .subscribe((usersToFollow: FollowModel[]) => {
          this.cachedFollowingUsers = true;
          this.followingUsers = cloneDeep(usersToFollow);
          this.followingUsersListener.next(this.followingUsers);
        });
    }
  }

  getFollowers() {
    if (this.cachedFollowers) {
      this.followersListener.next(this.followers);
    } else {
      this.httpClient
        .get<FollowModel[]>(`${URL.FOLLOWER_USERS}`)
        .subscribe((followers: FollowModel[]) => {
          this.cachedFollowers = true;
          this.followers = cloneDeep(followers);
          this.followersListener.next(this.followers);
        });
    }
  }

  followUser(usernamePrefixToFollow: string) {
    this.httpClient
      .post<FollowModel>(`${URL.FOLLOW_USER}`, {
        usernamePrefix: usernamePrefixToFollow,
      })
      .subscribe((user: FollowModel) => {
        this.followingUsers.unshift(user);
        this.followingUsersListener.next(this.followingUsers);
      });
  }

  unfollowUser(usernamePrefixToFollow: string) {
    this.httpClient
      .post(`${URL.UNFOLLOW_USER}`, {
        usernamePrefix: usernamePrefixToFollow,
      })
      .subscribe(() => {
        const userIndex = this.followingUsers.findIndex(
          (user: FollowModel) => user.usernamePrefix === usernamePrefixToFollow
        );
        if (userIndex > -1) {
          this.followingUsers.splice(userIndex, 1);
        }
        this.followingUsersListener.next(this.followingUsers);
      });
  }

  getFollowingUsersListener() {
    return this.followingUsersListener.asObservable();
  }

  getFollowersListener() {
    return this.followersListener.asObservable();
  }
}
