import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostModel, PostService } from 'libs/twitter-core/src';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'twitter-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class TwitterPostListComponent implements OnInit, OnDestroy {
  constructor(private readonly postService: PostService) {}
  posts: PostModel[] = [];
  private postsSubsciption: Subscription;

  ngOnInit(): void {
    this.postsSubsciption = this.postService.getPostUpdateListener().subscribe(
      (receivedPosts: PostModel[]) => (this.posts = receivedPosts),
      () => throwError(new Error('Could not fetch created posts!'))
    );
  }

  ngOnDestroy(): void {
    this.postsSubsciption.unsubscribe();
  }
}
