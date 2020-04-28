import { BackendPostModel } from './backend-post.model';

export interface BackendPaginatedPostsModel {
  posts: BackendPostModel[];
  totalPostsCount: number;
}
