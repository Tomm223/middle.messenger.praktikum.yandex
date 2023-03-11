import { SingController } from '@/service/sing.service'
import Component from '@/core/Component'
import { renderDOM } from '@/core/renderDOM'
import { isEqual } from '@/utils/isEqual'

class Route {
  _pathname: string

  _blockClass: any

  _block: null | any

  _props: Record<string, any>

  constructor(pathname: string, view: Component, props: Record<string, any>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render({})
    }
  }

  leave() {
    if (this._block) {
      this._block._hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render(props: Record<string, any>) {
    if (!this._block) {
      this._block = new this._blockClass(props)
      if (!this._block) return
      renderDOM(this._props.rootQuery, this._block)
      return
    }

    this._block._show()
  }
}

class RouterInst {
  static __instance: RouterInst

  routes: Route[]

  history: History

  _currentRoute: null | Route

  _rootQuery: string

  constructor(rootQuery: string) {
    if (RouterInst.__instance) return RouterInst.__instance

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    RouterInst.__instance = this
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })

    this.routes.push(route)

    return this
  }

  async start() {
    window.onpopstate = ((event: any) => {
      this.go(event.currentTarget.location.pathname)
    }).bind(this)

    await this.go(window.location.pathname)
  }

  async isValidUser() {
    const controller = new SingController()
    const isAuth = await controller.authorizationUser()
    return isAuth
  }

  async isRedirected(pathname: string): Promise<boolean> {
    const isValidUser = await this.isValidUser()
    let isRedirect = false

    if (isValidUser) {
      if (pathname !== '/messenger' && pathname !== '/setting') {
        // return '/messenger'
        this.go('/messenger')
        isRedirect = true
      }
    } else {
      if (pathname !== '/sing-in' && pathname !== '/sing-up') {
        // return '/sing-in'
        this.go('/sing-in')
        isRedirect = true
      }
    }
    return isRedirect
  }

  async _onRoute(pathname: string, props: Record<string, any> = {}) {
    let route: Route
    const routeOfPath = this.getRoute(pathname)

    if (routeOfPath) {
      const isRedirected = await this.isRedirected(pathname)

      if (isRedirected) {
        return
      }

      route = routeOfPath
    } else {
      route = this.getRouteNoFound() || this.getRouteError()
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render(props)
  }

  async go(pathname: string, props?: Record<string, any>) {
    this.history.pushState({}, '', pathname)
    await this._onRoute(pathname, props)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }

  getRouteNoFound() {
    return this.routes.find((route) => route.match('/no-found')) as Route
  }

  getRouteError() {
    return this.routes.find((route) => route.match('/error')) as Route
  }

  _unsubscribe() {
    this.routes = []
    this._currentRoute = null

    const rootDiv = document.querySelector(this._rootQuery) as HTMLElement
    rootDiv.innerHTML = ''
    document.body.style.overflow = 'visible'
    window.onpopstate = () => {}

    this.history.pushState({}, '', '/')
  }
}

const Router = new RouterInst('#root')
export default Router
