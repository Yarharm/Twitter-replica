// tslint:disable-next-line: no-namespace
export namespace URL {
  // BASIC
  const BACKEND_DOMAIN = 'http://localhost:3333';
  const API = `${BACKEND_DOMAIN}/api`;

  // AUTH
  export const AUTH_SIGNUP = `${API}/signup`;
  export const AUTH_LOGIN = `${API}/login`;

  // POSTS
  export const GET_POSTS = `${API}/posts`;
  export const CREATE_POST = `${API}/posts`;
  export const DELETE_POST = `${API}/posts/`;
  export const UPDATE_POST = `${API}/posts/`;
}
