import { UserType } from '@/types/user'
import { TestHelper } from '../utils/testHelpers'
import Router from './router'

describe('Router: redirect', () => {
  TestHelper.useRouter(null)

  afterAll(() => {
    TestHelper.goToMainPage()
  })

  test('start from sing-in', async () => {
    await TestHelper.startRouter()

    const path = window.location.pathname

    expect(path).toBe('/sing-in')
  })

  test('redirect to sing-in', async () => {
    await Router.go('/messenger')
    const path = window.location.pathname

    expect(path).toBe('/sing-in')
  })
})
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

describe('Router: base methods', () => {
  TestHelper.useRouter(null)

  afterEach(() => {
    TestHelper.goToMainPage()
  })

  test('go', async () => {
    await Router.go('/sing-up')
    const path = window.location.pathname

    expect(path).toBe('/sing-up')
  })

  test('back', async () => {
    await Router.go('sing-up')

    Router.back()

    const path = window.location.pathname

    expect(path).toBe('/sing-up')
  })
  test('forward', () => {
    Router.forward()

    const path = window.location.pathname
    expect(path).toBe('/sing-in')
  })
})
