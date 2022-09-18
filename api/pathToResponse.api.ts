/**
 * Interface PathToResponse defines the type for path key and their response
 * each api must have their respective path key type and their response type
 *
 * dynamic paths: [path: string]: ResponseType { params, body, response }
 * static paths: string: ResponseType { params, body, response }
 *
 * NOTE: The path string doesn't have a leading slash '/'
 */

export interface PathToResponse {
  'auth/login': {
    params: never
    body: {
      email: string
      password: string
    }
    response: Api.Base<Api.Session>
  }
  users: {
    params: never
    body: never
    response: Api.Base<Api.Session>
  }
  [path: `user/${number}`]: {
    params: never
    body: never
    response: never
  }
}
