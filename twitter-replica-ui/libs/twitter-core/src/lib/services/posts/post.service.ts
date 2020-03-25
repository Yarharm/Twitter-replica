import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel, PostBackendResponse } from 'libs/twitter-core/src';
import { URL } from 'libs/twitter-core/src/lib/services/urls';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  private posts: PostModel[] = [];
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
    this.httpClient.post(URL.CREATE_POST, post).subscribe(() => {
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPosts() {
    this.httpClient
      .get<PostBackendResponse>(URL.GET_POSTS)
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  private buildNewPost(
    id: number,
    title: string,
    description: string,
    content: string
  ) {
    return { id, title, description, content };
  }
}
