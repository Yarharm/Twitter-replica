import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostModel, PostService, AuthService } from 'libs/twitter-core/src';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'twitter-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class TwitterPostListComponent implements OnInit, OnDestroy {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService
  ) {}
  posts: PostModel[] = [];
  expandPosts = false;
  postTotalCount = 10;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [1, 2, 5, 10];
  authStatus = false;
  private authTokenSubs = new Subscription();
  private postsSubs: Subscription;
  private totalPostsCountSubs: Subscription;

  ngOnInit(): void {
    this.postService.getPosts(this.pageSize, this.currentPage);
    this.postsSubs = this.postService.getPostUpdateListener().subscribe(
      (receivedPosts: PostModel[]) => (this.posts = receivedPosts),
      () => throwError(new Error('Could not fetch created posts!'))
    );
    this.totalPostsCountSubs = this.postService
      .getTotalPostsListener()
      .subscribe((totalPostsCount: number) => {
        this.postTotalCount = totalPostsCount;
      });
    this.authStatus = this.authService.getAuthStatus();
    this.authTokenSubs = this.authService
      .getAuthTokenListener()
      .subscribe((hasAuthToken: boolean) => {
        this.authStatus = hasAuthToken;
      });
  }

  onChangePostPagination(paginationEvent: PageEvent) {
    this.pageSize = paginationEvent.pageSize;
    this.currentPage = paginationEvent.pageIndex;
    this.postService.getPosts(this.pageSize, this.currentPage);
  }

  deletePost(postId: string) {
    this.postService
      .deletePost(postId)
      .subscribe((postCount: { totalPosts: number }) => {
        const page =
          this.currentPage * this.pageSize < postCount.totalPosts
            ? this.currentPage
            : this.currentPage - 1;
        this.postService.getPosts(this.pageSize, page);
      });
  }

  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
    this.totalPostsCountSubs.unsubscribe();
    this.authTokenSubs.unsubscribe();
  }
}
