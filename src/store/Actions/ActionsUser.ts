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

export type UserActType = {
  getIsAuth: () => boolean
  setUser: (user: UserType) => void
  resetUser: () => void
  getUser: () => UserType | null
  setIsAuth: (bool: boolean) => void
}

const userAct: UserActType = {
  setIsAuth,
  resetUser,
  setUser,
  getUser,
  getIsAuth,
}

export default userAct
