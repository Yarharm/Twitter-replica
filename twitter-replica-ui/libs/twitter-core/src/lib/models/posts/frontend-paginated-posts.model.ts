import { PostModel } from './post.model';

export interface FrontendPaginatedPostsModel {
  posts: PostModel[];
  totalPostsCount: number;
}
