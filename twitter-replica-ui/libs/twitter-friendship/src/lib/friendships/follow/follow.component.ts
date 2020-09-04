import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FanOutService, FollowModel } from 'libs/twitter-core/src';

@Component({
  selector: 'twitter-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class TwitterFollowComponent implements OnInit, OnDestroy {
  constructor(
    private readonly fanOutService: FanOutService,
    private router: Router
  ) {}
  followingUsers: FollowModel[] = [];
  followers: FollowModel[] = [];
  isFollowersRoute = false;

  // Subscriptions
  followingUsersSubs: Subscription;
  followersSubs: Subscription;

  ngOnInit() {
    const routePath = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
    this.isFollowersRoute = routePath === 'following' ? false : true;

    this.followingUsersSubs = this.fanOutService
      .getFollowingUsersListener()
      .subscribe((users: FollowModel[]) => {
        this.followingUsers = users;
      });
    this.followersSubs = this.fanOutService
      .getFollowersListener()
      .subscribe((followers: FollowModel[]) => {
        this.followers = followers;
      });

    if (this.isFollowersRoute) {
      this.fanOutService.getFollowers();
    } else {
      this.fanOutService.getFollowingUsers();
    }
  }

  ngOnDestroy() {
    this.followingUsersSubs.unsubscribe();
  }
}
