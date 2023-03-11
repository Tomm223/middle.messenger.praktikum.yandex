import { TestHelper } from '../utils/testHelpers'
import { InitialStore } from '../store/Store'
import { SingController } from '@/service/sing.service'
import Actions from '@/store/Actions'
import { SingInRequest, SingUpRequest, UserType } from '@/types/user'

const userCheck: UserType = {
  id: 564007,
  first_name: 'Katik',
  second_name: 'Katik',
  display_name: 'Sdsds',
  login: 'Katik',
  avatar: '/28b67da5-904f-49b6-bbb4-3f4a1bc81462/72759a38-192e-4f52-8f36-74deedeb5ce7_puss.jpg',
  email: 'katenkadem1denko@yandex.ru',
  phone: '89965699895',
}

describe('SingController: login (+logout)', () => {
  TestHelper.useRouter(userCheck)

  beforeAll(() => {
    TestHelper.goToMainPage()
  })

  const singInData: SingInRequest = {
    login: 'Dannil',
    password: 'Dan1337.Osip',
  }

  test('login', async () => {
    await TestHelper.startRouter()
    // call
    const api = new SingController(userCheck)
    await api.login(singInData)
    // get const
    const user = Actions.getUser()
    const isAuth = Actions.getIsAuth()
    // check user
    expect(isAuth).toEqual(true)
    expect(user).toEqual(userCheck)
  })

  test('logout', async () => {
    const controller = new SingController(userCheck)
    const isGood = await controller.logout()

    const user = Actions.getUser()
    const isAuth = Actions.getIsAuth()

    expect(isGood).toBe(true)
    expect(user).toEqual(InitialStore.user)
    expect(isAuth).toBe(false)
  })
})

describe('SingController: Registration (+logout)', () => {
  beforeAll(() => {
    TestHelper.goToMainPage()
  })

  const singUpData: SingUpRequest = {
    email: 'daniil.@mail.com',
    first_name: 'Kslae',
    second_name: 'Uwewe',
    login: 'Oooo',
    password: 'P12313.,lfd',
    phone: '939493299294',
  }

  test('registration', async () => {
    await TestHelper.startRouter()

    const controller = new SingController(userCheck)
    await controller.registration(singUpData)

    const user = Actions.getUser()
    const isAuth = Actions.getIsAuth()

    expect(isAuth).toBe(true)
    expect(user).toEqual(userCheck)
  })
  test('logout', async () => {
    const controller = new SingController(userCheck)
    const isGood = await controller.logout()

    const user = Actions.getUser()
    const isAuth = Actions.getIsAuth()

    expect(isGood).toBe(true)
    expect(user).toEqual(InitialStore.user)
    expect(isAuth).toBe(false)
  })
})
