import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import Router from '@/app/router'

export default class Nagivation extends Component {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    const tag = e.target as HTMLAnchorElement
    const pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
    Router.go(pathname)
  }

  protected addEvents(): void {
    let links = this._element?.getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', this.handleHref.bind(this))
    }
  }

  protected removeEvents(): void {
    let links = this._element?.getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>
    for (let i = 0; i < links.length; i++) {
      links[i].removeEventListener('click', this.handleHref.bind(this))
    }
  }

  protected render(): HTMLElement {
    return (
      <nav class="nav_test">
        <div class="item_test">
          <a class="link_test" route="/setting">
            /Profile
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/sing-up">
            /SingUp
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/sing-in">
            /SingIn
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/messenger">
            /Messanger
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/no-found">
            /400
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/error">
            /500
          </a>
        </div>
      </nav>
    )
  }
}
