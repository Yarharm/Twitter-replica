// tslint:disable-next-line: no-namespace
export namespace URL {
  // BASIC
  const BACKEND_DOMAIN = 'http://localhost:3333';
  const API = `${BACKEND_DOMAIN}/api`;
  export const HOME_PAGE = '/';

  // AUTH
  const SINGUP = '/signup';
  export const LOGIN = '/login';
  export const AUTH_SIGNUP = `${API}${SINGUP}`;
  export const AUTH_LOGIN = `${API}${LOGIN}`;

  // USERS
  export const GET_USER = `${API}/user/`;

  // POSTS
  export const GET_POST = `/posts/`;
  export const GET_POSTS = `/posts`;
  export const CREATE_POST = `/posts`;
  export const DELETE_POST = `/posts/`;
  export const UPDATE_POST = `/posts/`;
}
