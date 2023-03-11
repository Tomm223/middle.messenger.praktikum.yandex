import { SetPasswordRequest, SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { HTTP } from '@/http/index'
import { getBoolOfStatusCode } from './helpers/getBoolOfStatusCode'

const UserHTTP = HTTP('/user')

export class UserAPI {
  constructor(mockResolve?: unknown) {
    if (mockResolve) {
      UserHTTP.mockResolve(mockResolve)
    }
  }

  getUserById(id: number): Promise<UserType> {
    return UserHTTP.get(`/${id}`).then((resp) => JSON.parse(resp.response))
  }

  setProfile(data: UserType): Promise<UserType | null> {
    return UserHTTP.put('/profile', { data }).then((resp) => {
      if (getBoolOfStatusCode(resp)) {
        return JSON.parse(resp.response)
      } else {
        return null
      }
    })
  }

  setAvatar(data: FormData): Promise<UserType | null> {
    return UserHTTP.put('/profile/avatar', { data, isFormData: true }).then((resp) => {
      if (getBoolOfStatusCode(resp)) {
        return JSON.parse(resp.response)
      } else {
        return null
      }
    })
  }

  setPassword(data: SetPasswordRequest): Promise<boolean> {
    return UserHTTP.put('/password', { data }).then((resp) => getBoolOfStatusCode(resp))
  }
}
