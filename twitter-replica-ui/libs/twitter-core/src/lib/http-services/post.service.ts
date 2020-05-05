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

  addPost(title: string, description: string, content: string, media: File) {
    const postInfo = new FormData();
    postInfo.append('title', title);
    postInfo.append('description', description);
    postInfo.append('content', content);
    postInfo.append('media', media, title);

    this.httpClient
      .post<BackendPostModel>(URL.CREATE_POST, postInfo)
      .subscribe((postData: BackendPostModel) => {
        const post: PostModel = this.buildNewPost(
          postData._id,
          postData.title,
          postData.description,
          postData.content,
          postData.mediaPath
        );
        this.posts.set(post.id, post);
        this.postsUpdated.next(Array.from(this.posts.values()));
        this.router.navigate([URL.HOME_PAGE]);
      });
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
                title: post.title,
                description: post.description,
                content: post.content,
                mediaPath: post.mediaPath,
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

  updatePost(
    id: string,
    title: string,
    description: string,
    content: string,
    media: File | string
  ) {
    let updatedPost: FormData | PostModel = null;
    if (typeof media === 'object') {
      updatedPost = new FormData();
      updatedPost.append('id', id);
      updatedPost.append('title', title);
      updatedPost.append('description', description);
      updatedPost.append('content', content);
      updatedPost.append('media', media, title);
    } else {
      updatedPost = this.buildNewPost(id, title, description, content, media);
    }
    this.httpClient
      .put<BackendPostModel>(`${URL.UPDATE_POST}${id}`, updatedPost)
      .subscribe((putData: BackendPostModel) => {
        const post: PostModel = this.buildNewPost(
          putData._id,
          putData.title,
          putData.description,
          putData.content,
          putData.mediaPath
        );
        this.posts.set(id, post);
        this.postsUpdated.next(Array.from(this.posts.values()));
        this.router.navigate([URL.HOME_PAGE]);
      });
  }

  deletePost(postId: string) {
    return this.httpClient.delete(`${URL.DELETE_POST}${postId}`);
  }

  private buildNewPost(
    id: string,
    title: string,
    description: string,
    content: string,
    mediaPath: string
  ) {
    return { id, title, description, content, mediaPath };
  }
}
