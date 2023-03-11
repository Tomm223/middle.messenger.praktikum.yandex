import { SingAPI } from '@/api/sing.api'
import { useValidation } from '@/shared/form/FormConstructor/validates.reg'
import Actions from '@/store/Actions'
import { SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { ValidateSingIn } from '@/widgets/SingIn/constants'
import { ValidateSingUp } from '@/widgets/SingUp/constants'
import Router from '@/app/router'

export class SingController {
  private _mockResolve: unknown

  constructor(mockResolve?: unknown) {
    if (mockResolve) {
      this._mockResolve = mockResolve
    }
  }

  public async authorizationUser() {
    try {
      const user = await this.getUser()
      if (user === null) {
        throw new Error('')
      }
      Actions.setUser(user)
      return true
    } catch {
      console.log('пользователь не авторизован')
      return false
    }
  }

  public async getUser() {
    try {
      const api = new SingAPI(this._mockResolve)
      const user = await api.getUser()
      if (!user) {
        return null
      }
      return user
    } catch {
      return null
    }
  }

  public async logout() {
    try {
      const api = new SingAPI(this._mockResolve)
      const status = await api.singout()

      if (!status) {
        throw new Error('')
      }

      Actions.resetStore()
      Router.go('/sing-in')

      return true
    } catch (e) {
      alert('Error Logout Service Frontend')
      return false
    }
  }

  public async login(data: SingInRequest) {
    try {
      Actions.startLoadingSingInPage()

      const validateData = useValidation(data, ValidateSingIn)

      if (!validateData) {
        throw new Error('FormData don`t valid')
      }
      const api = new SingAPI(this._mockResolve)

      const status = await api.singin(data)

      if (!status) {
        throw new Error()
      }

      const userData = await api.getUser()

      if (!userData) {
        throw new Error()
      }
      Actions.setUser(userData)
      Actions.clearDataSingInPage()
      Router.go('/messenger')
    } catch (error) {
      // Логика обработки ошибок
      Actions.setSingInPageError('Неверный логин или пароль')
    }
  }

  public async registration(data: SingUpRequest) {
    try {
      Actions.startLoadingSingUpPage()

      const validateData = useValidation(data, ValidateSingUp)

      if (!validateData) {
        throw new Error('FormData don`t valid')
      }
      const api = new SingAPI(this._mockResolve)

      const userID = await api.singup(data)

      if (!userID) {
        throw new Error('')
      }

      const userData = await api.getUser()

      if (!userData) {
        throw new Error()
      }
      Actions.setUser(userData)
      Actions.clearDataSingUpPage()
      Router.go('/messenger')
    } catch (error) {
      // Логика обработки ошибок
      console.log(error)
      Actions.setSingUpPageError('Ошибка')
    }
  }
}
