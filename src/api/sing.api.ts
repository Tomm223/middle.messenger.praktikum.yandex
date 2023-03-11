import { SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { HTTP } from '@/http/index'
import { getBoolOfStatusCode } from './helpers/getBoolOfStatusCode'

const AuthHTTP = HTTP('/auth')

export class SingAPI {
  constructor(mockResolve?: unknown) {
    if (mockResolve) {
      AuthHTTP.mockResolve(mockResolve)
    }
  }

  singin(data: SingInRequest): Promise<boolean> {
    return AuthHTTP.post('/signin', { data }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  singup(data: SingUpRequest): Promise<number> {
    return AuthHTTP.post('/signup', { data }).then((resp) => resp)
  }

  singout(): Promise<boolean> {
    return AuthHTTP.post('/logout').then((resp) => getBoolOfStatusCode(resp.status))
  }

  getUser(): Promise<UserType | null> {
    return AuthHTTP.get('/user').then((resp) => {
      if (!getBoolOfStatusCode(resp.status)) {
        return null
      }
      const user = JSON.parse(resp.response)

      if (typeof user !== 'object') {
        return null
      }
      return user
    })
  }
}

// export class SingUpAPI extends BaseAPI {
//   create(data?: any) {
//     return AuthHTTP.post('/singup', { data }).then((resp) => resp.id)
//   }
// }
