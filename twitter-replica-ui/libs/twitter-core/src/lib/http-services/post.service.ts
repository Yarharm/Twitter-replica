import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  PostModel,
  BackendPostModel,
  BackendPaginatedPostsModel,
  FrontendPaginatedPostsModel,
} from '../models';
import { AuthService } from './auth.service';
import { URL } from 'libs/twitter-core/src/lib/http-services/urls';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  private posts: Map<string, PostModel> = new Map();
  private totalPosts = new Subject<number>();
  private postsUpdated = new Subject<PostModel[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getTotalPostsListener() {
    return this.totalPosts.asObservable();
  }

  addPost(content: string, media: File) {
    const usernamePrefix = this.authService.getUsernamePrefix();
    const postInfo = new FormData();
    postInfo.append('content', content);
    postInfo.append('media', media);

    this.httpClient
      .post<BackendPostModel>(
        `${URL.GET_USER}${usernamePrefix}${URL.UPDATE_POST}`,
        postInfo
      )
      .subscribe(() => {
        this.router.navigate([`/user/${usernamePrefix}`]);
      });
  }

  getPosts(usernamePrefix: string, pageSize: number, currentPage: number) {
    const params = new HttpParams({
      fromString: `pageSize=${pageSize}&currentPage=${currentPage}`,
    });
    this.httpClient
      .get<BackendPaginatedPostsModel>(
        `${URL.GET_USER}${usernamePrefix}${URL.GET_POSTS}`,
        { params }
      )
      .pipe(
        map((postData: BackendPaginatedPostsModel) => {
          return {
            posts: postData.posts.map((post: BackendPostModel) => {
              return {
                id: post._id,
                content: post.content,
                mediaPath: post.mediaPath,
                creatorId: post.creatorId,
              };
            }),
            totalPostsCount: postData.totalPostsCount,
          };
        })
      )
      .subscribe((transformedPosts: FrontendPaginatedPostsModel) => {
        this.posts = transformedPosts.posts.reduce(
          (postMap: Map<string, PostModel>, transformPost: PostModel) =>
            postMap.set(transformPost.id, transformPost),
          new Map()
        );
        this.postsUpdated.next(Array.from(this.posts.values()));
        this.totalPosts.next(transformedPosts.totalPostsCount);
      });
  }

  getPost(postId: string) {
    return { ...this.posts.get(postId) };
  }

  updatePost(id: string, content: string, media: File | string) {
    const usernamePrefix = this.authService.getUsernamePrefix();
    let updatedPost: FormData | PostModel = null;
    if (typeof media === 'object') {
      updatedPost = new FormData();
      updatedPost.append('id', id);
      updatedPost.append('content', content);
      updatedPost.append('media', media);
    } else {
      updatedPost = this.buildNewPost(id, content, media);
    }
    this.httpClient
      .put<BackendPostModel>(
        `${URL.GET_USER}${usernamePrefix}${URL.UPDATE_POST}${id}`,
        updatedPost
      )
      .subscribe(() => this.router.navigate([`/user/${usernamePrefix}`]));
  }

  deletePost(postId: string) {
    const usernamePrefix = this.authService.getUsernamePrefix();
    return this.httpClient.delete(
      `${URL.GET_USER}${usernamePrefix}${URL.DELETE_POST}${postId}`
    );
  }

  private buildNewPost(
    id: string,
    content: string,
    mediaPath: string,
    creatorUsernamePrefix: string = null,
    creatorId: string = null
  ): PostModel {
    return { id, content, mediaPath, creatorUsernamePrefix, creatorId };
  }
}
