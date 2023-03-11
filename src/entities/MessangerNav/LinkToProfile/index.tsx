import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Polygon1 from '@/static/icons/Polygon1.svg'
import Component from '@/core/Component'
import Router from '@/app/router'

interface LinkToProfileType {
  onClick?: () => void
  href?: string
}

export default class LinkToProfile extends Component<LinkToProfileType> {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    const tag = e.currentTarget as HTMLAnchorElement
    const pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
    Router.go(pathname)
  }

  protected addEvents(): void {
    const link = this._element as HTMLAnchorElement

    link.addEventListener('click', this.handleHref.bind(this))
  }

  protected removeEvents(): void {
    const link = this._element as HTMLAnchorElement
    link.removeEventListener('click', this.handleHref.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <a class={styles.link_profile} route={this.props.href}>
        <p class={styles.link_profile__text}>Профиль</p>
        <img class={styles.link_profile__img} src={Polygon1} alt="" />
      </a>
    )
  }
}
