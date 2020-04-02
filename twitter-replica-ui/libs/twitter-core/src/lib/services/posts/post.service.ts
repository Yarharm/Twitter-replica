import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  PostModel,
  BackendPostModel,
  BackendPostsModel
} from 'libs/twitter-core/src';
import { URL } from 'libs/twitter-core/src/lib/services/urls';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  private posts: Map<string, PostModel> = new Map();
  private postsUpdated = new Subject<PostModel[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, description: string, content: string) {
    const post: PostModel = this.buildNewPost(
      null,
      title,
      description,
      content
    );
    this.httpClient
      .post<BackendPostModel>(URL.CREATE_POST, post)
      .subscribe((postData: BackendPostModel) => {
        post.id = postData._id;
        this.posts.set(post.id, post);
        this.postsUpdated.next(Array.from(this.posts.values()));
      });
  }

  getPosts() {
    this.httpClient
      .get<BackendPostsModel>(URL.GET_POSTS)
      .pipe(
        map((postData: BackendPostsModel) => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              title: post.title,
              description: post.description,
              content: post.content
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
    content: string
  ) {
    return { id, title, description, content };
  }
}
