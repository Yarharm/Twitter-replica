import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import {
  PostModel,
  PostService,
  AuthService,
  UserService,
  UserModel,
} from 'libs/twitter-core/src';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'twitter-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class TwitterPostListComponent implements OnInit, OnDestroy {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {}
  posts: PostModel[] = [];
  expandPosts = false;
  postTotalCount = 10;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [1, 2, 5, 10];
  authStatus = false;
  userId: string;
  currentUser: any;
  usernamePrefix: string;
  private authTokenSubs = new Subscription();
  private postsSubs: Subscription;
  private totalPostsCountSubs: Subscription;
  private currentUserSubs: Subscription;

  ngOnInit(): void {
    // User
    this.currentUser = this.userService.getCurrentUser();
    this.currentUserSubs = this.userService
      .getCurrentUserListener()
      .subscribe((user: UserModel) => {
        this.currentUser = user;
      });

    // Active route
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.usernamePrefix = paramMap.get('username');
      this.postService.getPosts(
        this.usernamePrefix,
        this.pageSize,
        this.currentPage
      );
    });

    // Posts
    this.postsSubs = this.postService.getPostUpdateListener().subscribe(
      (receivedPosts: PostModel[]) => (this.posts = receivedPosts),
      () => throwError(new Error('Could not fetch created posts!'))
    );

    // Total posts subs
    this.totalPostsCountSubs = this.postService
      .getTotalPostsListener()
      .subscribe((totalPostsCount: number) => {
        this.postTotalCount = totalPostsCount;
      });

    // Auth
    this.authStatus = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();
    this.authTokenSubs = this.authService
      .getAuthTokenListener()
      .subscribe((hasAuthToken: boolean) => {
        this.authStatus = hasAuthToken;
        this.userId = this.authService.getUserId();
      });
  }

  onChangePostPagination(paginationEvent: PageEvent) {
    this.pageSize = paginationEvent.pageSize;
    this.currentPage = paginationEvent.pageIndex;
    this.postService.getPosts(
      this.usernamePrefix,
      this.pageSize,
      this.currentPage
    );
  }

  deletePost(postId: string) {
    this.postService
      .deletePost(postId)
      .subscribe((postCount: { totalPosts: number }) => {
        const page =
          this.currentPage * this.pageSize < postCount.totalPosts
            ? this.currentPage
            : this.currentPage - 1;

        this.postService.getPosts(
          this.usernamePrefix,
          this.pageSize,
          page >= 0 ? page : 0
        );
      });
  }

  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
    this.totalPostsCountSubs.unsubscribe();
    this.authTokenSubs.unsubscribe();
    this.currentUserSubs.unsubscribe();
  }
}
