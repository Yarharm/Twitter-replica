import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  PostModel,
  BackendPostModel,
  BackendPostsModel,
} from 'libs/twitter-core/src';
import { URL } from 'libs/twitter-core/src/lib/services/urls';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  private posts: Map<string, PostModel> = new Map();
  private postsUpdated = new Subject<PostModel[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
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
      });
  }

  getPosts() {
    this.httpClient
      .get<BackendPostsModel>(URL.GET_POSTS)
      .pipe(
        map((postData: BackendPostsModel) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              description: post.description,
              content: post.content,
              mediaPath: post.mediaPath,
            };
          });
        })
      )
      .subscribe((transformedPosts: PostModel[]) => {
        this.posts = transformedPosts.reduce(
          (postMap: Map<string, PostModel>, transformPost: PostModel) =>
            postMap.set(transformPost.id, transformPost),
          new Map()
        );
        this.postsUpdated.next(Array.from(this.posts.values()));
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
      });
  }

  deletePost(postId: string) {
    this.httpClient.delete(`${URL.DELETE_POST}${postId}`).subscribe(() => {
      this.posts.delete(postId);
      this.postsUpdated.next(Array.from(this.posts.values()));
    });
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
