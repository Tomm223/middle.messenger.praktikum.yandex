import Router from '@/app/router'
import Nagivation from '@/pages/Navigation'
import { SingController } from '@/service/sing.service'

const isValidUser = (mock: unknown) => {
  if (mock) {
    return async () => {
      const controller = new SingController(mock)
      const isAuth = await controller.authorizationUser()
      return isAuth
    }
  } else {
    return async () => false
  }
}

class TestHelpers {
  private _mockGetUser: unknown

  implementingRouter() {
    document.body.innerHTML = '<div id="root"></div>'
    Router.isValidUser = isValidUser(this._mockGetUser)

    Router.use('/', Nagivation)
      .use('/messenger', Nagivation)
      .use('/setting', Nagivation)
      .use('/sing-in', Nagivation)
      .use('/sing-up', Nagivation)
      .use('/no-found', Nagivation)
      .use('/server-error', Nagivation)
  }

  useRouter(mockGetUser: unknown) {
    this._mockGetUser = mockGetUser
    // Router.isValidUser = isValidUser(this._mockGetUser)

    if (!Router.routes) {
      this.implementingRouter()
    } else if (!Router.routes.length) {
      this.implementingRouter()
    }
  }

  async startRouter() {
    await Router.start()
  }

  async goToMainPage() {
    await Router.go('/')
  }

  unsubscribeRouter() {
    return Router._unsubscribe()
  }
}

export const TestHelper = new TestHelpers()
