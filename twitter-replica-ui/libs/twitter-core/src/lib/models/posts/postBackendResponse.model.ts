export interface PostBackendResponse {
  message: string;
  posts: { _id: number; title: string; description: string; content: string }[];
}
