import { PostModel } from 'libs/twitter-core/src';

export interface PostBackendResponse {
  message: string;
  posts: PostModel[];
}
