import { UserAPI } from '@/api/user.api'
import Actions from '@/store/Actions'
import { SetPasswordRequest, UserType } from '@/types/user'

export class UserController {
  private _mockResolve: unknown

  constructor(mockResolve?: unknown) {
    if (mockResolve) {
      this._mockResolve = mockResolve
    }
  }

  public async getUserById(id: number) {
    const api = new UserAPI()
    const userData = await api.getUserById(id)

    return userData
  }

  public async setProfile(user: UserType): Promise<boolean> {
    try {
      const api = new UserAPI(this._mockResolve)
      const userData = await api.setProfile(user)
      if (!userData) {
        throw new Error('error response')
      }
      Actions.setUser(userData)

      return true
    } catch {
      alert('Error SetProfile Frontend Service')
      return false
    }
  }

  public async setAvatar(data: FormData): Promise<boolean> {
    try {
      const api = new UserAPI(this._mockResolve)
      const userData = await api.setAvatar(data)

      if (!userData) {
        throw new Error('error response')
      }
      Actions.setUser(userData)
      return true
    } catch {
      alert('Error SetAvatar Frontend Service')
      return false
    }
  }

  public async setPassword(user: SetPasswordRequest): Promise<boolean> {
    try {
      const api = new UserAPI(this._mockResolve)
      const status = await api.setPassword(user)

      if (!status) {
        throw new Error('error response')
      }
      return true
    } catch {
      alert('Error SetPassw Frontend Service')
      return false
    }
  }
}
