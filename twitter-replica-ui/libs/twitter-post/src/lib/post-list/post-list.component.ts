import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostModel, PostService } from 'libs/twitter-core/src';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'twitter-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class TwitterPostListComponent implements OnInit, OnDestroy {
  constructor(private readonly postService: PostService) {}
  posts: PostModel[] = [];
  expandPosts = false;
  postTotalCount = 10;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSubsciption: Subscription;
  private totalPostsCountSubscription: Subscription;

  ngOnInit(): void {
    this.postService.getPosts(this.pageSize, this.currentPage);
    this.postsSubsciption = this.postService.getPostUpdateListener().subscribe(
      (receivedPosts: PostModel[]) => (this.posts = receivedPosts),
      () => throwError(new Error('Could not fetch created posts!'))
    );
    this.totalPostsCountSubscription = this.postService
      .getTotalPostsListener()
      .subscribe((totalPostsCount: number) => {
        this.postTotalCount = totalPostsCount;
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
    this.postsSubsciption.unsubscribe();
    this.totalPostsCountSubscription.unsubscribe();
  }
}
