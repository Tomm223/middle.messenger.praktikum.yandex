import Actions from '@/store/Actions'
import { SetPasswordRequest, UserType } from '@/types/user'
import { UserController } from './user.service'

describe('UserController', () => {
  let Person: UserType
  let PasswordData: SetPasswordRequest
  beforeEach(() => {
    Person = {
      id: 12313,
      avatar: null,
      display_name: null,
      email: 'dan23453@mail.com',
      first_name: 'Kslae',
      second_name: 'Uwewe',
      login: 'Oooo',
      phone: '939493299294',
    }
    PasswordData = {
      newPassword: 'asdsda',
      oldPassword: 'asdasdas',
    }
  })

  test('setProfile', async () => {
    Person = { ...Person, first_name: 'Daniil', second_name: 'Osip', login: 'Daniil' }
    const controller = new UserController(Person)
    const bool = await controller.setProfile(Person)
    const user = Actions.getUser()

    expect(bool).toBe(true)
    expect(user).toEqual(Person)
  })
  test('setAvatar', async () => {
    Person = { ...Person, avatar: 'newavatar' }
    const controller = new UserController(Person)
    const bool = await controller.setAvatar(new FormData())
    const user = Actions.getUser()

    expect(bool).toBe(true)
    expect(user).toEqual(Person)
  })
  test('setPassword', async () => {
    const controller = new UserController(Person)
    const bool = await controller.setPassword(PasswordData)

    expect(bool).toBe(true)
  })
})
