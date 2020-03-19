import { Injectable } from '@angular/core';
import { PostModel } from 'libs/twitter-core/src';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, description: string, content: string) {
    this.posts.push(this.buildNewPost(title, description, content));
    this.postsUpdated.next([...this.posts]);
  }

  getPosts() {
    return cloneDeep(this.posts);
  }

  private buildNewPost(title: string, description: string, content: string) {
    return { title, description, content };
  }
}
