import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserModel, UserService, PostService } from 'libs/twitter-core/src';
import { Subscription } from 'rxjs';

@Component({
  selector: 'twitter-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class TwitterUserHomepageComponent implements OnInit, OnDestroy {
  usernamePrefix: string;
  currentUser: UserModel;
  currentUserSubs = new Subscription();

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.currentUserSubs = this.userService
      .getCurrentUserListener()
      .subscribe((user: UserModel) => {
        this.currentUser = user;
      });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   this.usernamePrefix = paramMap.get('username');
    //   this.userService.getUser(this.usernamePrefix);
    // });
  }

  ngOnDestroy() {
    this.currentUserSubs.unsubscribe();
  }
}
