import { SingController } from '@/service/sing.service'
import { UserType } from '@/types/user'
import Store from '../Store'

const store = new Store()

const getIsAuth = () => {
  return store.getState().isAuth
}
const setIsAuth = (bool: boolean) => {
  store.set('isAuth', bool)
}

const setUser = (user: UserType) => {
  store.set('user', user)

  setIsAuth(true)
}
const resetUser = () => {
  store.set('user', {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
  })
  setIsAuth(false)
}
const getUser = () => {
  return store.getState().user
}

const authorizationUser = async () => {
  try {
    const api = new SingController()

    const user = await api.getUser()
    if (user === null) {
      throw new Error('')
    }
    setUser(user)
    return true
  } catch {
    console.log('пользователь не авторизован')
    return false
  }
}

export type UserActType = {
  // authorizationUser: () => Promise<boolean>
  getIsAuth: () => boolean
  setUser: (user: UserType) => void
  resetUser: () => void
  getUser: () => UserType | null
  setIsAuth: (bool: boolean) => void
}

const userAct: UserActType = {
  // authorizationUser,
  setIsAuth,
  resetUser,
  setUser,
  getUser,
  getIsAuth,
}

export default userAct
