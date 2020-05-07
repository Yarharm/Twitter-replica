import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  PostModel,
  BackendPostModel,
  BackendPaginatedPostsModel,
  FrontendPaginatedPostsModel,
} from 'libs/twitter-core/src';
import { URL } from 'libs/twitter-core/src/lib/http-services/urls';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly httpClient: HttpClient,
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
    const postInfo = new FormData();
    postInfo.append('content', content);
    postInfo.append('media', media);

    this.httpClient
      .post<BackendPostModel>(URL.CREATE_POST, postInfo)
      .subscribe(() => this.router.navigate([URL.HOME_PAGE]));
  }

  getPosts(pageSize: number, currentPage: number) {
    const params = new HttpParams({
      fromString: `pageSize=${pageSize}&currentPage=${currentPage}`,
    });
    this.httpClient
      .get<BackendPaginatedPostsModel>(URL.GET_POSTS, { params })
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
      .put<BackendPostModel>(`${URL.UPDATE_POST}${id}`, updatedPost)
      .subscribe(() => this.router.navigate([URL.HOME_PAGE]));
  }

  deletePost(postId: string) {
    return this.httpClient.delete(`${URL.DELETE_POST}${postId}`);
  }

  private buildNewPost(
    id: string,
    content: string,
    mediaPath: string,
    creatorId: string = null
  ): PostModel {
    return { id, content, mediaPath, creatorId };
  }
}
