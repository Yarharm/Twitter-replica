import { BackendPostModel } from './backend-post.model';

export interface BackendPostsModel {
  message: string;
  posts: BackendPostModel[];
}
