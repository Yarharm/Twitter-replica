import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { URL } from './urls';
import { FollowModel, TweetTimelineModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FanOutService {
  constructor(private readonly httpClient: HttpClient) {}

  // Subjects
  private followingUsersListener = new Subject<FollowModel[]>();
  private followersListener = new Subject<FollowModel[]>();
  private timelineListener = new Subject<TweetTimelineModel[]>();

  getTimeline() {
    this.httpClient
      .get<TweetTimelineModel[]>(`${URL.GET_TIMELINE}`)
      .subscribe((tweets: TweetTimelineModel[]) => {
        this.timelineListener.next(tweets);
      });
  }

  getFollowingUsers() {
    this.httpClient
      .get<FollowModel[]>(`${URL.GET_FOLLOWING_USERS}`)
      .subscribe((usersToFollow: FollowModel[]) => {
        this.followingUsersListener.next(usersToFollow);
      });
  }

  getFollowers() {
    this.httpClient
      .get<FollowModel[]>(`${URL.GET_FOLLOWER_USERS}`)
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

  getTimelineListener() {
    return this.timelineListener.asObservable();
  }
}
